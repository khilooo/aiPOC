import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import {Button} from "@mui/material";
import './youtube.css'
import {useState} from "react";
import axios from 'axios';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import * as React from 'react';
import LinkIcon from '@mui/icons-material/Link';







function YouTubeComponent(props) {
    const groupList = props?.userData.groupList || [];
    const [searchText, setSearchText] = useState('');
    const [videoTtiles, setVideoTitles] = useState([]);
    const [videoIds, setVideoIds] = useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
// [title, url
    const handleSearch = (e) => {
        axios.post('http://localhost:3000/videos',{search:searchText}).then(res => {
            console.log(res);
            const titles = res.data.map(video => video.snippet.title);
            const ids = res.data.map(video => video.id.videoId);
            setVideoTitles(titles);
            setVideoIds(ids);
        }).catch(err => {
            console.log("not found" + err)
        });

    }
    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    }
    const handleSelectoin = (index: number) => {
        setSelectedIndex(index)
        axios.get('http://localhost:3000/captions', {
            params: {
                videoId: videoIds[index]
            }
        }).then(res => {
            console.log(res);

        }).catch(err => {
            console.log("not found" + err)
        });
    }



    function renderRow() {
        return (
            videoTtiles.map((title, index) => (
                <ListItemButton
                    key={index}
                    selected={selectedIndex === index}
                    onClick={() => handleSelectoin(index)}
                >
                    <ListItemIcon>
                        <LinkIcon />
                    </ListItemIcon>
                    <ListItemText primary={title} />
                </ListItemButton>
            ))
        );
    }

    return (
        <>

                <h2 className="titleSearch"><em>Yoni POC</em></h2>
                <div className="searchBar">
                    <TextField id="outlined-search" label="Search text" type="search"  onChange={handleInputChange} className="textBoxSearch"/>
                    <Button variant="contained" onClick={handleSearch}  endIcon={<SearchIcon />}>
                     Search
                    </Button>
                </div>
            <Box sx={{ width: '100%',  bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders" className="listStyle textBoxSearch">
                    {renderRow()}
                </List>
                <Divider />

            </Box>
            </>
        );


}


export default YouTubeComponent;