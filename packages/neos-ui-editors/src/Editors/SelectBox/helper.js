export const getInvalidValue = (value, options, i18n) => {
    if (!value) {
        return undefined
    }

    if (Array.isArray(value)) {
        return invalidArrayValue(value, options, i18n)
    }

    return invalidStringValue(value, options, i18n)
}

// Returns the invalid value with translation and the options with the invalid label
const invalidStringValue = (value, options, i18n) => {
    if (value === '') {
        return undefined;
    }
    const optionKeys = Object.keys(options);
    const label = optionKeys.includes(value) ?
        undefined :
        i18n.translate(
            'invalidValue',
            'Invalid',
            {value},
            'Neos.Neos.Ui',
            'Main'
        )

    return {
        value: label,
        options: [{
            value: label,
            label
        }]
    }
}

// Returns a list of all selected value and replaces invalid values with the translated invalid massage
// also returns a new list of options with the translated invalid messages
const invalidArrayValue = (value, options, i18n) => {
    if (value.length === 0) {
        return undefined;
    }

    const optionKeys = Object.keys(options);
    const invalidValues = []
    const invalidValueOptions = []
    value.forEach((v) => {
        const isValid = optionKeys.includes(v)
        if (!isValid) {
            const label = i18n.translate(
                'invalidValue',
                'Invalid',
                {value: v},
                'Neos.Neos.Ui',
                'Main'
            )
            invalidValues.push(label)
            invalidValueOptions.push({value: label, label})
        } else {
            invalidValues.push(v)
        }
    });

    return {
        value: invalidValues.length > 0 ? invalidValues : undefined,
        options: invalidValueOptions
    }
}
