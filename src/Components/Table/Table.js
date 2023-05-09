import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
// import "./orders.css";

// function createData(name, trackingId, date, status) {
//   return { name, trackingId, date, status };
// }

const Orders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [orders, setOrders] = useState([]);
 
  useEffect(() => {
    
    const fetchProducts = async () => {
      const token = localStorage.getItem('artsy-jwt');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const res = await axios.get('/orders/product-orderd', config);
      console.log(res.data)
       const allordersArray=res.data.allOrders
      if(Array.isArray(allordersArray)){
        setOrders(allordersArray);
      }
      // console.log(a)
      else if(res.data.hasOwnProperty("Note") && res.data.Note==="No Products to show"){
        setOrders([])
      }
      
    };
    fetchProducts();
  }, []);
  // const handleDelete = async (orderId) => {
  //   const token = localStorage.getItem('artsy-jwt');
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   };
  //   const res = await axios.delete(`/orders/delete/${orderId}`, config);
    
  // }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
    return (
      <>
      {orders.length===0?(
        <div className="Table">
        
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          className="table_container"
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell align="left">Tracking ID</TableCell>
                <TableCell align="left">Date</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody><p>NO PRODUCTS TO SHOW</p></TableBody>
            </Table>
            </TableContainer>
        
        </div>):(
      <div className="Table">
       
        
          
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          className="table_container"
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell align="left">Tracking ID</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
           
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    tabIndex={-1}
                    key={row.title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="left">{row._id}</TableCell>
                    <TableCell align="left">{row.createdAt}</TableCell>
                    
                    <TableCell align="left" className="Details">
                      Detail
                    </TableCell>
                    <TableCell align="left" className="Details">
        {/* <button variant="contained" color="primary" onClick={() => handleDelete(row._id)}>
          Delete
        </button> */}
      </TableCell>

                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 2, 3, 4]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        
      </div>)}</>
  );
};

export default Orders