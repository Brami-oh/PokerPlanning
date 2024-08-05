import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
    const response = await fetch('https://localhost:5050/weatherforecast', {
        headers: {
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*'
        }
    });

    return response.json();
};

export function useData() {
    return useQuery({ queryKey: ['userData'], queryFn: fetchData });
}
