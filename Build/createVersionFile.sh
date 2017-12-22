#!/usr/bin/env bash

# abort script if any command returns non-zero
set -e

# file to read the version information from
SOURCE_FILE='./packages/neos-ui/package.json'
# file to write the version information to
TARGET_FILE='./packages/utils-helpers/src/getVersion.js'

# -e = if file exists
if [[ -e $SOURCE_FILE && -e $TARGET_FILE ]]; then
    currentVersion=$(cat $SOURCE_FILE \
        | grep version \
        | head -1 \
        | awk -F: '{ print $2 }' \
        | sed 's/[",]//g' \
        | sed 's/\s//g')

    commitHash=$(git rev-parse HEAD)

    # recreate file
    echo -e "const getVersion = () => {
    return 'v$currentVersion $commitHash';
};

export default getVersion;" > $TARGET_FILE

else
    # Print error message on stdout
    echo "ERROR: $SOURCE_FILE or $TARGET_FILE doesn't exist" 1>&2
fi

