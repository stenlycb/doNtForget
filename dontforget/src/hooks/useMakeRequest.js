import axios from "axios";
import { useEffect, useState } from "react";



const useMakeRequest = () => {

    const [data, setData] = useState({});

    const requestExec = async (url, method, reqData = null) => {

        let response = {};

        if (url !== '' && method !== '') {

            let axiosParamaters = {
                method: method,
                data: reqData,
                url: url,
                headers: {
                    'Accept': 'application/json',
                },
            };

            response = await axios(axiosParamaters);
        }

        return response;
    }


    const validateAndExec = async (req) => {

        if (req !== undefined && Object.keys(req).length > 0) {

            let url = '';
            let method = 'get';
            let reqData = {};

            if (req.url !== undefined) {
                url = req.url;
            }

            if (req.method !== undefined) {
                method = req.method;
            }

            if (req.data !== undefined) {
                reqData = req.data;
            }

            if (url !== '') {

                const res = await requestExec(url, method, reqData);

                if (['delete'].indexOf(method) === -1 && res.data !== undefined && res.data !== null) {
                    setData(res.data);
                }
            }
        }
    }

    const makeRequest = async (req) => {

        await validateAndExec(req);
    }

    useEffect(() => {

    }, [data]);

    return [data, makeRequest];

}

export default useMakeRequest;