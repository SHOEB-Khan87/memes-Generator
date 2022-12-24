import * as React from 'react';
import { useState,useRef,useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';


import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
function DropDown() {
  const [age, setAge] = React.useState('');
  const [color,setColor] = useState("")
let [image,setImage] = useState("");
let [topText,setTopText]= useState("")
let [bottomText,setBottomText]= useState("")
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};
  const handleChange = (event) => {
    setAge(event.target.value);
  };
const canvas = useRef(null)
const getImage = (e) =>{
    const image = new Image();
   let img = URL.createObjectURL(e.target.files[0]);
   image.src =img;
   image.onload = () =>setImage(image)


}
useEffect(()=>{
if(image && canvas){
    const ctx = canvas.current.getContext("2d")
    ctx.drawImage(image,0,0);
    ctx.font = "40px comic Sans MS"
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(topText,150,40)
    ctx.fillText(bottomText,150,250)
}
},[image,canvas,topText,bottomText,color])
const download = (event) =>{
let link = event.currentTarget;
link.setAttribute("download","canvas.png")
let image = canvas.current.toDataURL("image.png")
link.setAttribute("href",image);
}
  return (
    <>
 <Grid xs={12} container justifyContent="center" >
  <Grid xs={12} sm={6} lg={6} item>
    <h1 className='selected'>Meme generator</h1>
    <h3 className='selected'>Create a meme from JPEG or PNG images.</h3>
    <h4 className='selected'>Edit your image and make a meme</h4>
    <Box  sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Image</InputLabel>
        <Select 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <input type="file" id='imageLoader' onChange={getImage}/>  
          <MenuItem value="">option</MenuItem>
        
        </Select>
      </FormControl>
     
      
    </Box>
    {image && 
    <div className="select">
            <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        text
      </Button>
      
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <TextField placeholder='upper Text' type="text" value={topText} onChange={e=>setTopText(e.target.value)}/>
        <TextField placeholder='bottom Text'type="text" value={bottomText} onChange={e=>setBottomText(e.target.value)}/>
        <input type="color" id="favcolor" name="favcolor" onChange={e=>setColor(e.target.value)}  value={color}/>
     <a href="link" onClick={download}> <Button  size="small" variant='contained'>Download</Button></a>
      </Menu>
    </div>

<canvas className='select' ref={canvas} id="myCan" style={{display:"block"}}  width="auto" height="300px" ></canvas>
        


    </div>
    }
    </Grid>
    </Grid>
  
    </>
  );
}
export default DropDown