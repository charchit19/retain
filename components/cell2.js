import React from 'react';
import '../styles/cell2.css'
import AddIcon from '@mui/icons-material/Add';

const Cell2 = () => {
    return (
        <div className='main-container2'>
            <div className='box2'>
                <AddIcon style={{ marginRight: '4px' }} />
                Add Product Filters
            </div>
        </div>
    );
}

export default Cell2;
