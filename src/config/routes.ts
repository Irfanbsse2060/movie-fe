export const routePaths = {
    discover: "/",
    discoverMovie: (movieId?: string | undefined) => movieId? `/discover/${movieId}`:  "/discover/:movieId",
    manage: "/manage"
}

export const linkWithRoutes = [
    {
        label: "Discover",
        url: routePaths.discover
    },
    {
        label: "Manage",
        url: routePaths.manage
    }
]
