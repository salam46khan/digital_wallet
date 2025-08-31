import { TErrorSources, TGenericErrorResponse } from "../interface/error.type"

export const handlerZodError = (err: any): TGenericErrorResponse => {
    const errorSours: TErrorSources[] = []

    err.issues.forEach((issue: any) => {
        errorSours.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message
        })
    })

    return {
        statusCode: 400,
        message: "Zod Error",
        errorSours

    }
}