import React, { useState } from 'react';
import Graph from './Graph';
import { useStoreContext } from '../../contextApi/ContextApi';
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery';
import ShortenPopUp from './ShortenPopUp';
import { FaLink } from 'react-icons/fa';
import ShortenUrlList from './ShortenUrlList';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { motion } from 'framer-motion';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const { token } = useStoreContext();
    const navigate = useNavigate();
    const [shortenPopUp, setShortenPopUp] = useState(false);

    const {isLoading, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, navigate)
    const {isLoading: loader, data: totalClicks} = useFetchTotalClicks(token, navigate)

    return (
        <div className="dashboard-container">
            {loader ? ( 
                <Loader />
            ) : ( 
            <div className="dashboard-content">
                <div className="graph-section">
                    {totalClicks?.length === 0 && (
                        <div className="no-data-overlay">
                            <h1 className="no-data-heading">No Data For This Time Period</h1>
                            <h3 className="no-data-subheading">Share your short link to view where your engagements are coming from</h3>
                        </div>
                    )}
                    <Graph graphData={totalClicks} />
                </div>
                <div className='create-url-section'>
                    <button
                        className='create-url-button'
                        onClick={() => setShortenPopUp(true)}>
                        Create a New Short URL
                    </button>
                </div>
                <div className="url-list-section">
                    {!isLoading && myShortenUrls?.length === 0 ? (
                        <div className="no-links-message">
                            <div className="no-links-card">
                                <h1 className="no-links-text">You haven't created any short link yet</h1>
                                <FaLink className="no-links-icon" />
                            </div>
                        </div>
                    ) : (
                        <ShortenUrlList data={myShortenUrls} />
                    )}
                </div>
            </div>
            )}
            <ShortenPopUp
                refetch={refetch}
                open={shortenPopUp}
                setOpen={setShortenPopUp}
            />
        </div>
    );
};

export default DashboardLayout;
