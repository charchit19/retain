"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState, useCallback } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageSelector from "./ImageSelector";
import toast, { Toaster } from 'react-hot-toast';
import Cell from "./cell";
import Cell2 from "./cell2";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Utility function to create row data
function createData(productName, primaryVariant) {
    return { productName, primaryVariant };
}

// Sample data for the table
const rowsData = [
    createData("", ""),
    createData("", ""),
    createData("", ""),
];

// Initial column configuration
const initialColumns = [
    { label: "Product Filter", key: "productName" },
    { label: "Primary Variant", key: "primaryVariant" },
    { label: "Variant 2", key: "variant2" },
];

// Row component for each row in the table with drag-and-drop capability
const Row = ({ row, index, moveRow, columns, addColumn, isLoadingCol, onImageSelect, onDeleteRow }) => {
    const ref = React.useRef(null);
    const [selectedColIndex, setSelectedColIndex] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [hovered, setHovered] = useState(false);

    // Drag and drop setup for the row
    const [{ isDragging }, drag] = useDrag({
        type: "row",
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "row",
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveRow(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    drag(drop(ref));

    // Handle row deletion
    const handleDeleteClick = () => {
        onDeleteRow(index);
    };

    // Handle cell click for image selection
    const handleCellClick = (colIndex) => {
        setSelectedColIndex(colIndex);
        setModalOpen(true);
    };

    return (
        <>
            <TableRow
                ref={ref}
                sx={{
                    "&:last-child td, &:last-child th": { border: "1px solid #ccc" },
                    cursor: isDragging ? "grabbing" : "grab",
                    opacity: isDragging ? 0.5 : 1,
                    height: "80px",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <TableCell
                    sx={{
                        position: "sticky",
                        left: 0,
                        backgroundColor: '#fffcfc',
                        zIndex: 3,
                        width: 100
                    }}
                >
                    {hovered && (
                        <DeleteIcon
                            onClick={handleDeleteClick}
                            sx={{
                                cursor: "pointer",
                                color: "red",
                                zIndex: 4,
                                position: 'absolute',
                                top: '23%',
                                left:'40px',
                                transform: 'translateX(-50%)',
                            }}
                        />
                    )}
                    <p style={{
                        fontSize: '2rem',
                        fontFamily: 'sans-serif',
                        margin: '0',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        {index + 1}
                        <DragIndicatorIcon sx={{ height: '3rem', width: '2rem' }} />
                    </p>
                </TableCell>

                {columns.map((column, colIndex) => (
                    <TableCell
                        key={colIndex}
                        align="center"
                        sx={{
                            position: colIndex === 0 ? "sticky" : "initial",
                            left: colIndex === 0 ? 80 : "auto",
                            backgroundColor: '#fffcfc',
                            zIndex: colIndex === 0 ? 2 : 0,
                            width: colIndex === 0 ? 250 : 120,
                            minWidth: colIndex === 0 ? 250 : 120,

                        }}
                    >
                        {colIndex > 0 ? (
                            !row[column.key] ? (
                                <Cell onClick={() => handleCellClick(colIndex)} />
                            ) : (
                                <Cell onClick={() => handleCellClick(colIndex)} image={row[column.key]} />
                            )
                        ) : (
                            <Cell2 />
                        )}
                    </TableCell>
                ))}
                <TableCell>
                    {isLoadingCol ? <CircularProgress size="2rem" /> :
                        <AddBoxIcon variant="contained" onClick={addColumn} style={{
                            cursor: 'pointer'
                        }} />}
                </TableCell>
            </TableRow>
            <ImageSelector
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSelectImage={(image) => {
                    onImageSelect(index, selectedColIndex, image);
                    setModalOpen(false);
                }}
            />
        </>
    );
};

// Main component for the table
export default function BasicTable() {
    const [columns, setColumns] = useState(initialColumns);
    const [rows, setRows] = useState(rowsData);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCol, setIsLoadingCol] = useState(false);

    // Handle row deletion
    const handleDeleteRow = (rowIndex) => {
        setRows((prevRows) => prevRows.filter((_, index) => index !== rowIndex));
        toast.success("Row deleted");
    };

    // Handle image selection for a cell
    const handleImageSelect = (rowIndex, colIndex, image) => {
        const columnName = columns[colIndex].key; // Extract the column key
        setRows((prevRows) => {
            const updatedRows = [...prevRows];
            updatedRows[rowIndex][columnName] = image; // Update the specific row and column
            return updatedRows;
        });
    };

    // Function to add a new row
    const addRow = () => {
        setIsLoading(true);
        setTimeout(() => {
            const emptyRow = columns.reduce((acc, col) => {
                acc[col.key] = ""; // Initialize empty values for new row
                return acc;
            }, {});
            setRows((prevRows) => [...prevRows, emptyRow]);
            toast.success("Row added");
            setIsLoading(false);
        }, 1000);
    };

    // Function to add a new column
    const addColumn = () => {
        setIsLoadingCol(true);
        setTimeout(() => {
            const newColumn = `Variant ${columns.length}`; // Define new column label
            setColumns((prevColumns) => [...prevColumns, { label: newColumn, key: `variant${columns.length}` }]);
            setRows((prevRows) =>
                prevRows.map((row) => ({
                    ...row,
                    [newColumn]: "", // Initialize new column with empty values
                }))
            );
            toast.success("Column added");
            setIsLoadingCol(false);
        }, 1000);
    };

    // Move a row within the table
    const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
            const updatedRows = [...rows];
            const [draggedRow] = updatedRows.splice(dragIndex, 1);
            updatedRows.splice(hoverIndex, 0, draggedRow);
            setRows(updatedRows);
        },
        [rows]
    );

    return (
        <>
            <Toaster />
            <DndProvider backend={HTML5Backend}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "fit-content",
                    }}
                >
                    <TableContainer
                        sx={{
                            backgroundColor: '#fffcfc',
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                            width: "90%",
                            overflowX: "auto",
                            marginTop: '20px'
                        }}
                        component={Paper}
                    >
                        <style>
                            {`
                            ::-webkit-scrollbar {
                                display: none;
                            }
                        `}
                        </style>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            position: "sticky",
                                            left: 0,
                                            backgroundColor: '#fffcfc',
                                            zIndex: 3,
                                            minWidth: "10%",
                                            maxWidth: "10%",
                                        }}
                                    >
                                    </TableCell>
                                    {columns.map((column, index) => (
                                        <TableCell
                                            key={column.key}
                                            sx={{
                                                position: index === 0 ? "sticky" : "initial",
                                                left: index === 0 ? 80 : "auto",
                                                backgroundColor: '#fffcfc',
                                                zIndex: index === 0 ? 2 : 1,
                                                textAlign: 'center',
                                            }}
                                        >
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <p >
                                                    {column.label}
                                                </p>
                                                {index !== 0 && (
                                                    <MoreVertIcon style={{ marginLeft: '15px' }} />
                                                )}
                                            </div>
                                        </TableCell>
                                    ))}

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <Row
                                        key={index}
                                        index={index}
                                        row={row}
                                        moveRow={moveRow}
                                        columns={columns}
                                        addColumn={addColumn}
                                        isLoadingCol={isLoadingCol}
                                        onImageSelect={handleImageSelect}
                                        onDeleteRow={handleDeleteRow}
                                    />
                                ))}
                                <TableRow>
                                    <TableCell sx={{
                                        position: "sticky",
                                        left: 0,
                                        backgroundColor: '#fffcfc',
                                        zIndex: 3,
                                        minWidth: "10%",
                                    }}>
                                        {isLoading ? <CircularProgress size="2rem" /> : <AddBoxIcon variant="contained" onClick={addRow} style={{ cursor: 'pointer' }} />}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </DndProvider >
        </>
    );
}
