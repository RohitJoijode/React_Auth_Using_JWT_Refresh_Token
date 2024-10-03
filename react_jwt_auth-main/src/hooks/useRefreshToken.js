import axios from '../api/axios';
import useAuth from './useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const useRefreshToken = () => {
    //debugger;
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // const refresh = async () => {
    //     debugger;
    //     alert('RefreshToken');
    //     const response = await axios.get('/RefreshToken', {
    //         withCredentials: true
    //     });
    //     setAuth(prev => {
    //         console.log(JSON.stringify(prev));
    //         console.log(response.data.jwtToken);
    //         return { ...prev, jwtToken: response.data.jwtToken }
    //     });
    //     return response.data.jwtToken;
    // }
    // return refresh;


    // const refresh = async () => {
    //     try {
    //         debugger;
    //         alert('RefreshToken');
            
    //         // POST request with parameters (if necessary)
    //         // const response = await axios.post('/RefreshToken', 
    //         //     {
    //         //         // Send refresh token or any required data as a parameter
    //         //         accessToken: sessionStorage.getItem("accessToken"),
    //         //         refreshToken: sessionStorage.getItem("refreshToken") 
    //         //     }, 
    //         //     {
    //         //         withCredentials: true,
    //         //         headers: {
    //         //             'Content-Type': 'application/json' // Ensure this matches the expected server content type
    //         //         }
    //         //     }
    //         // );
    //         const accessToken = sessionStorage.getItem("accessToken");
    //         const refreshToken = sessionStorage.getItem("refreshToken");

    //         const response = await axios.get('/RefreshToken',
    //             JSON.stringify({ accessToken,refreshToken}),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }
    //         );
    
    //         // Update the auth state with the new token
    //         setAuth(prev => {
    //             console.log(JSON.stringify(prev));
    //             console.log(response.data.jwtToken);
    //             return { ...prev, jwtToken: response.data.jwtToken }
    //         });
    
    //         return response.data.jwtToken;
    //     } catch (error) {
    //         console.error('Token refresh failed', error);
    //         // Handle the error appropriately
    //     }
    // }
    
    // return refresh;

    const refresh = async () => {
        try {
            // Assuming `refreshToken` is the token you want to send
            const accessToken = sessionStorage.getItem("accessToken");
            const refreshToken = sessionStorage.getItem("refreshToken") 
            // const refreshToken = "your-refresh-token"; // Replace with actual token value
    
            // Make a GET request with the refresh token as a query parameter
            const response = await axios.get('/RefreshToken', {
                params: {
                    JwtToken: accessToken,
                    RefreshToken: refreshToken  // Query parameters sent to the server
                },
                withCredentials: true,  // If the server requires credentials (cookies, etc.)
                headers: {
                    'Content-Type': 'application/json'  // Optional for GET, but useful if expecting JSON
                }
            });
    
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");

            sessionStorage.setItem("accessToken",response.data.jwtToken);
            sessionStorage.setItem("refreshToken",response.data.refreshToken);
            // Handle the response and update your auth state with the new JWT token
            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log(response.data.jwtToken);
                return { ...prev, jwtToken: response.data.jwtToken }
            });
    
            return response.data.jwtToken;
    
        } catch (error) {
            debugger;
            if (error?.response?.status === 401) {
                navigate('/login', { state: { from: location }, replace: true });
            }
            console.error('Token refresh failed', error);
            // Handle error, e.g., show a message or log out
        }
    };
    return refresh;
};




export default useRefreshToken;
