interface ApiDataInterface {
    year: number,
    months: [
        {
            readonly month: 'January',
            consumption: number
        },
        {
            readonly month: 'Februray',
            consumption: number
        },
        {
            readonly month: 'March',
            consumption: number
        },
        {
            readonly month: 'April',
            consumption: number
        },
        {
            readonly month: 'Mai',
            consumption: number
        },
        {
            readonly month: 'June',
            consumption: number
        },
        {
            readonly month: 'July',
            consumption: number
        },
        {
            readonly month: 'August',
            consumption: number
        },
        {
            readonly month: 'September',
            consumption: number
        },
        {
            readonly month: 'October',
            consumption: number
        },
        {
            readonly month: 'November',
            consumption: number
        },
        {
            readonly month: 'December',
            consumption: number
        },
    ]
}


export { ApiDataInterface };