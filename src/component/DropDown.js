import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
function DropDown() {
  let [text, setText] = useState("")
  let [height, setHeight] = useState("");
  let [width, setWidth] = useState("");
  const [age, setAge] = useState('');
  const [color, setColor] = useState("")
  let [image, setImage] = useState("");
  let [topText, setTopText] = useState("")
  let [bottomText, setBottomText] = useState("")



  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const canvas = useRef(null)
  const getImage = (e) => {

    const image = new Image();
    let img = URL.createObjectURL(e.target.files[0]);
    console.log(e, 'img')
    image.src = img;
    image.onload = function () {
      setImage(image);
      let height = this.height;
      let width = this.width;
      setHeight(height)
      setWidth(width)
      if (height >= 900) {
        setText(10)
      } else if(height >=700){
        setText(8)
      }else{
        setText(5)
      }
    }


  }

  useEffect(() => {
    if (image && canvas) {
      const ctx = canvas.current.getContext("2d")
      console.log(image, 'image')
      ctx.drawImage(image, 0, 0);
      ctx.font = text + "vh sans-serif";
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.fillText(topText, width / 2, height / 6)
      ctx.fillText(bottomText, width / 2, height / 1.1)
    }
  }, [image, canvas, topText, bottomText, color,height,text,width])
  const download = (event) => {
    let link = event.currentTarget;
    link.setAttribute("download", "canvas.png")
    let image = canvas.current.toDataURL("image.png")
    link.setAttribute("href", image);
  }
  return (
    <>
      <Grid item xs={12} container justifyContent="center" >
        <Grid item xs={12} sm={6} lg={6} >
          <h1 className='selected'>Meme generator</h1>
          <h3 className='selected'>Create a meme from JPEG or PNG images.</h3>
          <h4 className='selected'>Edit your image and make a meme</h4>
          <Box sx={{ m: 1, minWidth: 120 }}>
            <FormControl className='check' fullWidth>
              <InputLabel id="demo-simple-select-label">Select Image</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"


                onChange={handleChange}
              >
                <MenuItem ><TextField  type="file" onChange={getImage} /></MenuItem>

              </Select>
            </FormControl>


          </Box>
          {image &&
            <div className="select">
              <PopupState  variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <Button variant="contained" id="fade-button" {...bindTrigger(popupState)}>
                      text
                    </Button>
                    <Popover 
                      anchorPosition={{ top: 100, left: 200 }}
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                    >
                      <MenuItem>  <TextField placeholder='upper Text' type="text" value={topText} onChange={e => setTopText(e.target.value)} /></MenuItem>
                      <MenuItem> <TextField placeholder='bottom Text' type="text" value={bottomText} onChange={e => setBottomText(e.target.value)} /></MenuItem>
                      <MenuItem style={{ display: "flex" }}>   <TextField className='width' type="color" id="favcolor" name="favcolor" onChange={e => setColor(e.target.value)} value={color} /></MenuItem>
                      <a href="link" className='TextField' onClick={download}> <Button size="small" variant='outlined'>Download</Button></a>
                    </Popover>
                  </div>
                )}
              </PopupState>
              <canvas className='select' ref={canvas} id="myCan" height={height} width={width} ></canvas>



            </div>
          }
        </Grid>
      </Grid>

    </>
  );
}
export default DropDown