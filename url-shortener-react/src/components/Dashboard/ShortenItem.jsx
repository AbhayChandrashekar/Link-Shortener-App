import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { IoCopy } from 'react-icons/io5';
import { LiaCheckSolid } from 'react-icons/lia';
import { MdAnalytics, MdOutlineAdsClick } from 'react-icons/md';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../contextApi/ContextApi';
import { Hourglass } from 'react-loader-spinner';
import Graph from './Graph';
import './ShortenItem.css'; // This is the new line

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
    const { token } = useStoreContext();
    const navigate = useNavigate();
    const [isCopied, setIsCopied] = useState(false);
    const [analyticToggle, setAnalyticToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState("");
    const [analyticsData, setAnalyticsData] = useState([]);

    const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
        /^https?:\/\//,
        ""
      );

    const analyticsHandler = (shortUrl) => {
        if (!analyticToggle) {
            setSelectedUrl(shortUrl);
        }
        setAnalyticToggle(!analyticToggle);
    }

    const fetchMyShortUrl = async () => {
        setLoader(true);
        try {
            const { data } = await api.get(`/api/urls/analytics/${selectedUrl}?startDate=2024-12-01T00:00:00&endDate=2025-12-31T23:59:59`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
              });
            setAnalyticsData(data);
            setSelectedUrl("");
            console.log(data);
            
        } catch (error) {
            navigate("/error");
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        if (selectedUrl) {
            fetchMyShortUrl();
        }
    }, [selectedUrl]);

    return (
        <div className={`shorten-item-container`}>
            <div className={`url-details`}>
                <div className="url-group">
                    <Link
                      target='_'
                      className='short-url'
                      to={import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`}>
                        {subDomain + "/s/" + `${shortUrl}`}
                    </Link>
                    <FaExternalLinkAlt className="external-link-icon" />
                </div>
                <div className="original-url-group">
                    <h3 className="original-url-text">
                      {originalUrl}
                    </h3>
                </div>
                <div className="analytics-info">
                    <div className="clicks-info">
                        <MdOutlineAdsClick className="clicks-icon" />
                        <span className="clicks-count">{clickCount}</span>
                        <span className="clicks-text">
                            {clickCount === 0 || clickCount === 1 ? "Click" : "Clicks"}
                        </span>
                    </div>
                    <div className="date-info">
                        <FaRegCalendarAlt className="calendar-icon" />
                        <span className="date-text">
                            {dayjs(createdDate).format("MMM DD, YYYY")}
                        </span>
                    </div>
                </div>
                <div className="action-buttons">
                    <CopyToClipboard
                        onCopy={() => setIsCopied(true)}
                        text={`${import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`}`}
                    >
                        <div className="copy-button-container">
                            <button className="copy-button">{isCopied ? "Copied" : "Copy"}</button>
                            {isCopied ? (
                                <LiaCheckSolid className="check-icon" />
                            ) : (
                                <IoCopy className="copy-icon" />
                            )}
                        </div>
                    </CopyToClipboard>
                    <div onClick={() => analyticsHandler(shortUrl)} className="analytics-button-container">
                        <button className="analytics-button">Analytics</button>
                        <MdAnalytics className="analytics-icon" />
                    </div>
                </div>
            </div>
            <React.Fragment>
                <div className={`analytics-graph ${analyticToggle ? "active" : ""}`}>
                    {loader ? (
                        <div className="loader-container">
                            <div className="loader-content">
                                <Hourglass
                                    visible={true}
                                    height="50"
                                    width="50"
                                    ariaLabel="hourglass-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    colors={['#306cce', '#72a1ed']}
                                />
                                <p className='loader-text'>Please Wait...</p>
                            </div>
                        </div>
                    ) : ( 
                        <>
                            {analyticsData.length === 0 && (
                                <div className="no-data-analytics-overlay">
                                    <h1 className="no-data-heading">No Data For This Time Period</h1>
                                    <h3 className="no-data-subheading">Share your short link to view where your engagements are coming from</h3>
                                </div>
                            )}
                            <Graph graphData={analyticsData} />
                        </>
                    )}
                </div>
            </React.Fragment>
            <style>
                {`
                .shorten-item-container {
                    background-color: white;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-bottom: 1rem;
                }
                .url-details {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .url-group {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .short-url {
                    font-weight: 600;
                    color: #3b82f6;
                    text-decoration: underline;
                    font-size: 1.0625rem;
                }
                .original-url-group {
                    flex-wrap: wrap;
                }
                .original-url-text {
                    color: #475569;
                    font-weight: 400;
                    font-size: 1.0625rem;
                }
                .analytics-info {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }
                .clicks-info, .date-info {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: #1e293b;
                }
                .action-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                .copy-button-container, .analytics-button-container {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    padding: 0.5rem 1rem;
                    border-radius: 0.375rem;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    font-weight: 600;
                    background-color: #f3f4f6;
                    color: #1e293b;
                }
                .copy-button, .analytics-button {
                    background: none;
                    border: none;
                    font-weight: 600;
                    cursor: pointer;
                    color: #1e293b;
                }
                .analytics-button-container {
                    background-color: #d1d5db;
                }
                .analytics-graph {
                    max-height: 24rem;
                    margin-top: 1.25rem;
                    position: relative;
                    border-top: 2px solid #e2e8f0;
                    width: 100%;
                    overflow: hidden;
                    display: none;
                }
                .analytics-graph.active {
                    display: flex;
                }
                .loader-container {
                    min-height: calc(450px - 140px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                }
                .loader-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.25rem;
                }
                .loader-text {
                    color: #475569;
                }
                .no-data-analytics-overlay {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-end;
                    width: 100%;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    margin: auto;
                }
                .no-data-heading {
                    color: #1e293b;
                    font-family: serif;
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 0.25rem;
                }
                .no-data-subheading {
                    color: #475569;
                    font-size: 0.75rem;
                    text-align: center;
                }
                @media (min-width: 640px) {
                    .url-details {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .no-data-analytics-overlay {
                        align-items: center;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default ShortenItem;