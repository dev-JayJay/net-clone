import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { fetchData } from '../../api/fetchData';
import { enqueueSnackbar } from 'notistack';
import { useKeycloak } from '../../keycloak';

export const AboutPage = () => {
    const { authenticated, getToken } = useKeycloak();
    // const [data, setData] = useState(null);

    const {mutate, isPending, isSuccess, isError, data, error} = useMutation({
        mutationKey: 'aboutPage',
        mutationFn: fetchData,
        onSuccess: (data) => {
            enqueueSnackbar({
                variant: isSuccess,
                message: 'Succes Fetching About Data',
            });
            console.log(`checking data from keycloak api ${data}`);
        },
        onError: (error) => {
            console.log(`error fetching About data ${error}`);
        }
    });

    useEffect(() => {
        if (authenticated) {
            const token = getToken();
            console.log(`checking the token ${token}`);
            mutate(['http://localhost:8081/api/private', 'GET', token]);
        }
    },[authenticated]);

    if (!authenticated) {
        return <div>You are not authenticated.</div>
    }

  return (
    <div className='text-4xl text-white text-center'>
        {
            isPending ? (<p>Loading...</p>) : 
                isSuccess && data (
                    data.message
                )
        }
    </div>
  )
}
