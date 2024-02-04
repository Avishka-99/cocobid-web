import React, { useEffect, useState } from 'react';
import Picker from './DateTimePicker';
import Axios from '../api/Axios';
import * as API_ENDPOINTS from '../api/ApiEndpoints';
import * as ToastMessages from './ToastMessages';
export default function NewAuction(props) {
    const [datetime, setDateTime] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const handleSubmit = () => {
        var isClean = true;
        if (!datetime) {
          ToastMessages.error('Please Pick a Closing Date');
          isClean = false;
        }
        if (!price) {
          ToastMessages.error('Please Select a Price');
          isClean = false;
        }
        if (!description) {
          ToastMessages.error('Please Add a Description');
          isClean = false;
        }
        if (images.length == 0) {
          ToastMessages.error('Please Select Atleast One Image')
          isClean = false;
        }
        if (isClean) {
          const formData = new FormData();
          for (let index = 0; index < images.length; index++) {
            formData.append('file', images[index])
    
          }
    
          const date = new Date(datetime.$d);
          console.log(date)
          console.log(typeof (date))
          formData.append('userId', sessionStorage.getItem('user_id'))
          formData.append('closingdate', date)
          formData.append('basePrice', price)
          formData.append('auctionDescription', description)
          Axios.post(API_ENDPOINTS.SUBMIT_AUCTION_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
            ToastMessages.success(response.data.message)
            //setIsOpen(false)
          })
        }
    
    
      }
      const loadImages = (event) => {
        setImages(event.target.files)
        let files = event.target.files;
        const fileobj = [];
        fileobj.push(files);
        let reader;
        if (fileobj[0].length > 5) {
          for (var i = 0; i < 5; i++) {
            reader = new FileReader();
            reader.readAsDataURL(fileobj[0][i]);
            reader.onload = event => {
              preview.push(event.target.result);
    
              setPreview([...new Set(preview)]);
            }
          }
        } else {
          for (var i = 0; i < fileobj[0].length; i++) {
            reader = new FileReader();
            reader.readAsDataURL(fileobj[0][i]);
            reader.onload = event => {
              preview.push(event.target.result);
              setPreview([...new Set(preview)]);
            }
          }
        }
      }
    return (
        <>
            <h2  style={{ fontFamily: 'poppins-medium' }}>Create an Auction</h2>
            <div style={{
                width: '100%',
                height: '80%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <textarea style={{
                    width: '100%',
                    height: '40%',
                    resize: 'none',
                    outline: '1px solid black',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px',


                }}
                    placeholder="Description..."
                    onChange={(event) => setDescription(event.target.value)}
                >

                </textarea>
                <div>
                    <input style={{
                        width: '100%',
                        height: '45px',
                        outline: '1px solid black',
                        border: 'none',
                        borderRadius: '10px',
                        marginTop: '10px',
                        textAlign: 'right',
                        paddingRight: '10px'
                    }} type='number' required placeholder='Base Price (Rs.)' onChange={(event) => setPrice(event.target.value)}></input>
                </div>
                <Picker onChange={setDateTime} />
                <div className='imagePreview' >
                    {(preview || []).map((image, index) => (
                        <div className='previewBox' >
                            <img key={index} src={image} />
                        </div>
                    ))}


                </div>
                <input type="file" id="upload" hidden onChange={loadImages} multiple />
                <label className='uploadBtn' for="upload">Select images (Upto 5 images)</label>
                <div className='bid_btn' style={{ marginTop: '3%' }} onClick={handleSubmit}>
                    Place
                </div>
            </div>
        </>
    )
}
