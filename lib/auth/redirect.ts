export function serverSideRedirectTo(target: string) {
    return {
        redirect: {
            destination: target,
        },
        props: {},
    }
}
