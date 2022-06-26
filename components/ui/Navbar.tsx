import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import MenuOutLinedIcon from '@mui/icons-material/MenuOutlined'
import { useContext } from "react"
import { UIContext } from "../../context/ui"
import NextLink from "next/link"

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
        <NextLink href="/" passHref >
          <Link underline="none" color="white">
            <Typography variant="h6">OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
