import React from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import qs from 'qs'

export function useQuery() {
    const { search } = useLocation()
    const [params, setParams] = useSearchParams()

    const query = React.useMemo(
        () => qs.parse(search, { ignoreQueryPrefix: true }),
        [search]
    )

    const setQuery = (newValue) => {
        setParams({ ...query, ...newValue })
    }

    return [query, setQuery]
}
