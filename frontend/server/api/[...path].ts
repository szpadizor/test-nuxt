// server/api/[...path].ts
export default defineEventHandler(async (event) => {
    const path = event.context.params?.path ?? ''
    const method = event.method
    const body = method !== 'GET' ? await readBody(event) : undefined

    return await $fetch(`http://laravel:8000/api/${path}`, {
        method,
        body,
        headers: {
            'Content-Type': 'application/json',
        }
    })
})