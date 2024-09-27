import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Grid, TextField, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dress1 from '../images/dress1.webp';
import dress2 from '../images/dress2.webp';
import dress3 from '../images/dress3.webp';
import dress4 from '../images/dress4.webp';
import dress5 from '../images/dress5.webp';
import dress6 from '../images/dress6.webp';
import dress7 from '../images/dress7.webp';
import dress8 from '../images/dress8.webp';
import Image from 'next/image';

const images = [
    { src: dress1, title: 'Chic Evening Gown' },
    { src: dress2, title: 'Floral Summer Dress' },
    { src: dress3, title: 'Elegant Party Wear' },
    { src: dress4, title: 'Casual Everyday Style' },
    { src: dress5, title: 'Vintage Lace Dress' },
    { src: dress6, title: 'Bohemian Maxi Dress' },
    { src: dress7, title: 'Classic' },
    { src: dress8, title: 'Trendy Midi Dress' },
];

const ImageSelector = ({ open, onClose, onSelectImage }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleImageSelect = (image) => {
        onSelectImage(image);
        onClose();
    };

    const filteredImages = images.filter((image) =>
        image.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <span>Select an Image</span>
                    <IconButton onClick={onClose} color="inherit">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <TextField
                    variant="outlined"
                    placeholder="Search images..."
                    fullWidth
                    margin="normal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Grid container spacing={2}>
                    {filteredImages.map((image, index) => (
                        <Grid item xs={4} key={index}>
                            <Box
                                onClick={() => handleImageSelect(image.src)}
                                sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.title}
                                    width={250}
                                    height={250}
                                    style={{ borderRadius: '8px' }}
                                />
                                <Typography variant="subtitle2" sx={{ padding: '8px' }}>
                                    {image.title}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageSelector;
