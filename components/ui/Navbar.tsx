import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuOutLinedIcon from '@mui/icons-material/MenuOutlined'
import { useContext } from "react"
import { UIContext } from "../../context/ui"

export const Navbar = () => {

  const {openSideMenu} = useContext(UIContext)

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          onClick={openSideMenu}
        >
          <MenuOutLinedIcon />
        </IconButton>
        <Typography variant="h6">OpenJira</Typography>
      </Toolbar>
    </AppBar>
  )
}
