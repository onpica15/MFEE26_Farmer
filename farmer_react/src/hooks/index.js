import React from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

export function useQuery() {
    const { search } = useLocation();

    return React.useMemo(
        () => qs.parse(search, { ignoreQueryPrefix: true }),
        [search]
    );
}
