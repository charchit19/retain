import React from 'react';
import '../styles/cell.css'
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

const Cell = ({ onClick, image }) => { // Accept onClick prop
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className='main-container'>
            {
                image ? (
                    <Box
                        onClick={onClick}
                        onMouseEnter={() => setIsHovered(true)} // Set hover state to true on Box hover
                        onMouseLeave={() => setIsHovered(false)}
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
                            src={image}
                            alt="image"
                            style={{ borderRadius: '8px', width: "100px", height: '80px' }}
                        />
                        {isHovered && ( // Show the edit icon only when hovered
                            <Box
                                sx={{
                                    position: 'absolute', // Absolute positioning for the icon
                                    top: '50%', // Center vertically
                                    left: '50%', // Center horizontally
                                    transform: 'translate(-50%, -50%)', // Adjust for centering
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight background for visibility
                                    borderRadius: '50%', // Circular background
                                    padding: '8px', // Padding around the icon
                                }}
                            >
                                <EditIcon /> {/* The edit icon */}
                            </Box>
                        )}
                    </Box>
                ) : (
                    <div className='box' onClick={onClick}>
                        <AddIcon style={{ marginRight: '4px' }} />
                        Add Design
                    </div>
                )
            }
        </div>
    );
}

export default Cell;
