import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import "./Home.css";
import TableCom from "./TableCom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { v4 as uuid } from "uuid";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#1602FF",
    borderRadius: "20px",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#2196f3",
    },
  },
  button1: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    color: "#AB8484",
    "&:hover": {
      backgroundColor: "#1602FF",
    },
  },
}));

const Home = () => {
  const [open, setOpen] = useState(false);
  const [salesManagers, setSalesManager] = useState([]);
  const [salesPurchaseManagers, setSalesPurchaseManager] = useState([]);
  const [storeManagers, setStoreManager] = useState([]);
  const [staffName, setStaffName] = useState("");
  const [selectedStore, setSelectedStore] = useState(0);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedNewRole, setSelectedNewRole] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const navigate = useNavigate();

  const handleEdit = () => {
    setOpen(true);
    setEditMode(true);
  };

  const handleStaffNameChange = (event) => {
    setStaffName(event.target.value);
  };

  const handleSelectedStoreChange = (event) => {
    setSelectedStore(event.target.value - "a");
  };

  const handleSelectedRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleClickOpen = () => {
    setEditMode(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getRoles = () => {
    const response = axios.get(
      "http://stock.staging.digitalregister.in:8080/api/v2/staffAccess/get/b78a77e4-5063-4810-b8cb-0de1b9c3f099"
    );
    response.then((res) => {
      const data = res.data;
      setStoreManager(data.storeManagerModels);
      setSalesManager(data.salesManagerModels);
      setSalesPurchaseManager(data.salesPurchaseManagerModels);
    });
  };

  const getRole = (id) => {
    if (salesManagers.find((item) => item.staffModel.staffId === id)) {
      return "SALES_MANAGER";
    } else if (
      salesPurchaseManagers.find((item) => item.staffModel.staffId === id)
    ) {
      return "SALES_PURCHASE_MANAGER";
    } else if (storeManagers.find((item) => item.staffModel.staffId === id)) {
      return "STORE_MANAGER";
    } else {
      return "No Role";
    }
  };

  const handleDeleteStaff = async (id) => {
    await axios.delete(
      "http://stock.staging.digitalregister.in:8080/api/v1/staff/delete/" + id
    );
    navigate("/");
  };

  const handleEditStaff = async (id) => {
    const phone = code + mobile;
    const response = await axios.post(
      "http://stock.staging.digitalregister.in:8080/api/v1/staff/update/",
      {
        businessId: "kbktbFmdvENXoEriN0UD7VboJET2",
        name: name,
        phone: phone,
        staffId: id,
      }
    );

    const newResponse = await axios.post(
      "http://stock.staging.digitalregister.in:8080/api/v1/staffAccess/add",
      {
        access_type: selectedNewRole,
        staffId: response.data.staffId,
        storeId: selectedStore,
      }
    );
    navigate("/");
  };

  const handleAddStaff = async () => {
    const id = uuid();
    if(selectedStore==="b78a77e4-5063-4810-b8cb-0de1b9c3f099"){
    const responce = await axios.post(
      "http://stock.staging.digitalregister.in:8080/api/v1/staff/add",
      {
        businessId: "kbktbFmdvENXoEriN0UD7VboJET2",
        name: name,
        phone: code + mobile,
        staffId: id,
      }
    );

    const newRes = await axios.post(
      "http://stock.staging.digitalregister.in:8080/api/v1/staffAccess/add",
      {
        access_type: selectedRole,
        staffId: responce.data.staffId,
        storeId: selectedStore,
      }
    );
    }

    navigate("/");
  };

  const handleRoleChange = (event) => {
    setSelectedNewRole(event.target.value);
    setSelectedRole(event.target.value);
  };

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  useEffect(() => {
    if (editMode) {
      setName(userEdit.name);
      setCode(userEdit.mobile.substring(0, 3));
      setMobile(userEdit.mobile.substring(3));
    }
    getRoles();
  }, [editMode, userEdit]);

  const classes = useStyles();
  return (
    <div
      style={{
        width: "100%",
        height: "89%",
        backgroundColor: "#F8F8FF",
        position: "relative",
      }}
    >
      <Navbar openModel={handleClickOpen} />
      <div className="btn" style={{marginBottom:"2%"}}>
        <Button
          variant="contained"
          value="1"
          className={classes.button}
          onClick={() => {
            setSelectedStore(0);
          }}
        >
          Store A
        </Button>
        <Button
          variant="contained"
          value="1"
          className={classes.button1}
          onClick={() => {
            setSelectedStore(1);
          }}
        >
          Store B
        </Button>
      </div>
      {selectedStore == 0 ||
      selectedStore == "b78a77e4-5063-4810-b8cb-0de1b9c3f099" ? (
        <TableCom
          handleClickOpen={handleEdit}
          handleDeleteStaff={handleDeleteStaff}
          setUserEdit={setUserEdit}
          setSelectedRole={setSelectedRole}
          setSelectedStore={setSelectedStore}
          salesManagers={salesManagers}
          storeManagers={storeManagers}
          salesPurchaseManagers={salesPurchaseManagers}
          getRoles={getRoles}
        />
      ) : (
        "Empty"
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {editMode ? "Edit Staff" : "Add Staff"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <label htmlFor="staff">Staff Name</label>
              <TextField
                autoFocus
                margin="dense"
                label="Staff Name"
                type="text"
                variant="outlined"
                fullWidth
                defaultValue={editMode ? userEdit.name : ""}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <label htmlFor="code">Code</label>
              <TextField
                margin="dense"
                label="Code"
                type="tel"
                variant="outlined"
                fullWidth
                defaultValue={editMode ? userEdit.mobile.substring(0, 3) : ""}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <label htmlFor="Mobile Number">Mobile Number</label>
              <TextField
                margin="dense"
                label="Mobile Number"
                type="tel"
                fullWidth
                variant="outlined"
                onChange={(e) => setMobile(e.target.value)}
                defaultValue={
                  editMode
                    ? userEdit.mobile.substring(3, userEdit.mobile.length)
                    : ""
                }
              />
            </Grid>
            <Grid item xs={6}>
              <label htmlFor="Select Store">Select Store</label>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="select-store-label">Select Store</InputLabel>
                <Select
                  labelId="select-store-label"
                  id="select-store"
                  onChange={handleSelectedStoreChange}
                  defaultValue={editMode ? selectedStore : ""}
                  variant="outlined"
                >
                  <MenuItem value={"b78a77e4-5063-4810-b8cb-0de1b9c3f099"}>
                    Store A
                  </MenuItem>
                  <MenuItem value="b">Store B</MenuItem>
                  <MenuItem value="c">Store C</MenuItem>
                  <MenuItem value="d">Store D</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <label htmlFor="Select Role">Select Role</label>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="select-role-label">Select Role</InputLabel>
                <Select
                  labelId="select-role-label"
                  id="select-role"
                  value={selectedRole}
                  onChange={handleSelectedRoleChange}
                  variant="outlined"
                  defaultValue={editMode ? getRole(userEdit.staffId) : ""}
                >
                  <MenuItem value="role1">Store Admin</MenuItem>
                  <MenuItem value="role2">Sales Operator</MenuItem>
                  <MenuItem value="role3"> Sales Purchase Operator</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="main" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="main"
            onClick={() => {
              handleClose();
              editMode ? handleEditStaff(userEdit.staffId) : handleAddStaff();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
