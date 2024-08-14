import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { useVendor } from '../contexts/VendorContext.jsx';
import { SITE_URL } from "@/App";


const columns = [
    { id: 'vendor', label: 'Vendor', minWidth: 170 },
    { id: 'Equipment', label: 'Equipment', minWidth: 170 },
    { id: 'Quality', label: 'Quality', minWidth: 100 },
    { id: 'Price', label: 'Price', minWidth: 170 },
    { id: 'apply', label: 'Apply', align: 'center', minWidth: 170 }, // Corrected ID
];

const VendorTable = () => {
    const { toast } = useToast()
    const { vendorData } = useVendor();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Fetching the user image from cookies
    const cookieuserid = Cookies.get("user_id");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Apply button functionality

    const handleApply = (user_id, vendor_emailID, equipmentName) => {
        fetch(`${SITE_URL}/api/method/procurement_ai.utils.quotation_mail.send_quotation_mail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user_id, cookieuserid,
                to_address: vendor_emailID,
                equipment_name: equipmentName
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                if (data.message) {
                    toast({
                        description: `${data.message.message}`,
                        status: 'success', 
                        duration: 5000, 
                        isClosable: true, 
                    });
                } else if (data.error) {
                    toast({
                        description: `${data.error}`,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            })
            .catch(error => {
                toast({
                    description: `An error occurred: ${error.message}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 470 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendorData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === 'apply' ? (
                                                    <Button
                                                        className='bg-gradient-to-b from-gray-800 via-black to-gray-900 !text-white'
                                                        onClick={() => handleApply(cookieuserid, row.email_id, row.Equipment)}
                                                    >
                                                        Apply
                                                    </Button>
                                                ) : (
                                                    value
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={vendorData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default VendorTable;
