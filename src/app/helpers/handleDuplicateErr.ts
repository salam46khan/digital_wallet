export const handlerDuplicateError = (err: any) => {
        const match = err.message.match(/"([^"]*)"/)
        return {
            message : `${match[1]} already exsit`
        }
    }