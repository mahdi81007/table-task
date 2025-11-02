import {type MutationFunction, useMutation as _useMutation, type UseMutationOptions} from '@tanstack/react-query'


const useMutation = (mutator:MutationFunction, options:UseMutationOptions = {}) =>
    _useMutation({
        mutationFn: mutator,
        ...options,
    })

export { useMutation }
