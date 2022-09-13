import React from 'react';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from "react-router-dom";

import HowToRegIcon from '@mui/icons-material/HowToReg';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import HomeIcon from '@mui/icons-material/Home';

import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import './index.css'

interface DataTypeOne {
    key: React.Key;
    name: string;
    email: string;
    account: string;
    inviteCode: string;
    uniqueToken: string;
}

interface DataTypeTwo {
    key: React.Key;
    name: string;
    email: string;
    account: string;
    socialMedia: string;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 300,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));


const AdminPage = () => {

    let navigate = useNavigate();

    const [emailValue, setEmailValue] = useState('');
    const [handleBtn, setHandleBtn] = useState(true);

    const [acceptedData, setAcceptData] = useState<any>();
    const [requestedData, setRequestedData] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataTypeTwo[]) => {
            setEmailValue(selectedRows[0].email);
            setHandleBtn(false);
        }
    };

    useEffect(() => {
        (async () => {
            await axios.get('/user/getusers')
                .then(response => {
                    const userDatas: [] = response.data;

                    const tempAcceptedData = userDatas.filter((item: any) => item.isAccepted === true);
                    const tempRequestedData = userDatas.filter((item: any) => item.isRequested === true);

                    const acceptedData = tempAcceptedData.map((item: any, index: any) => {
                        return {
                            key: index + 1,
                            name: item.fullName,
                            email: item.email,
                            account: item.accountAddress,
                            inviteCode: item.inviteCode,
                            uniqueToken: item.jwtToken
                        }
                    })

                    const requestedData = tempRequestedData.map((item: any, index: any) => {
                        return {
                            key: index + 1,
                            name: item.fullName,
                            email: item.email,
                            account: item.accountAddress,
                            socialMedia: item.socialMedia
                        }
                    })

                    setAcceptData(acceptedData);
                    setRequestedData(requestedData);
                })
        }
        )();
    }, [isLoading]);

    const onAcceptBtn = async () => {
        setIsLoading(true);
        await axios.post('/user/creatormanage', { email: emailValue, accepted: 'OK' })
            .then(receive => {
                setIsLoading(false);
            })
    }

    const goHomeBack = () => {
        navigate('/');
    }

    const acceptedColumn: ColumnsType<DataTypeOne> = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text: string) => <a>{text}</a>,
            width: 200,
            fixed: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 300
        },
        {
            title: 'Account Address',
            dataIndex: 'account',
            key: 'account',
            width: 400
        },
        {
            title: 'Invite Code',
            dataIndex: 'inviteCode',
            key: 'invitCode',
            width: 320
        },
        {
            title: 'Creator Unique Token',
            dataIndex: 'uniqueToken',
            key: 'uniqueToken',
            width: 4000
        }        
    ];

    const requestedColumn: ColumnsType<DataTypeTwo> = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Social Media',
            dataIndex: 'socialMedia',
            key: 'socialMedia',
        },
        {
            title: 'Account Address',
            dataIndex: 'account',
            key: 'account'
        },
    ];

    return (
        <div>
            {isLoading ? <div className='loader-container'><h1 className='acceptingText'> Now Accepting Request </h1></div> : <div>
                <HtmlTooltip title={<React.Fragment>
                    Go Back <em>{"First Page"}</em>
                    </React.Fragment>}>
                    <Fab color="secondary" aria-label="BackHome" sx={{ position: 'absolute', right: '3%', top: '2vh' }} onClick={goHomeBack}>
                        <HomeIcon fontSize="medium" />
                    </Fab>
                </HtmlTooltip>
                <HowToRegIcon sx={{ color: 'rgb(255 167 0)', fontSize: 40, position: 'absolute', left: '3%', top: '3vh' }} /><h3 style={{ fontFamily: 'Franklin Gothic', position: 'absolute', left: '6%', top: '4vh' }}> ACCEPTED CREATORS </h3>
                <Table className="creatorsTable" dataSource={acceptedData} columns={acceptedColumn} scroll={{ x: 3000 }} />
                <LocalLibraryIcon sx={{ color: 'rgb(255 167 0)', fontSize: 40, position: 'absolute', left: '3%', top: '50vh' }} /><h3 style={{ fontFamily: 'Franklin Gothic', position: 'absolute', left: '6%', top: '51vh' }}> WISH BECOME CRATORS</h3>
                <Table rowSelection={{ type: 'radio', ...rowSelection }} className="reqeustsTable" dataSource={requestedData} columns={requestedColumn} />
                <Fab variant="extended" size="medium" sx={{ ml: 5, my: 0, position: 'absolute', bottom: '2vh', width: '95%' }} onClick={onAcceptBtn} disabled={handleBtn}>
                    <MarkChatReadIcon sx={{ mr: 1 }} />
                    ACCEPT CREATOR
                </Fab>
            </div>
            }
        </div>
    )
}

export default AdminPage;