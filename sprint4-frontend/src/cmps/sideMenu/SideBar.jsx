
import React, { useState } from 'react'
import { SideIndex } from './SideIndex'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toggleLibraryAction } from '../../store/actions/layout.actions'
import { useDispatch } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery'

export function SideBar() {

    const [isWhiteFill, setIsWhiteFill] = useState(true)
    const [toggleSvgSearch, setToggleSvgSearch] = useState(false)
    const toggleLibrary = useSelector(stateStore => stateStore.layoutModule.toggleLibrary)
    // const [toggleLibrary, setToggleLibrary] = useState(false)
    const dispatch = useDispatch()

    const matchesNarrow = useMediaQuery('(max-width: 720px)')
    const matchesMobile = useMediaQuery('(max-width: 480px)')


    const handleHomeButtonClick = () => {
        setIsWhiteFill(prevState => !prevState)
        setToggleSvgSearch(false)
    }

    const handleSearchButtonClick = () => {
        setIsWhiteFill(true)
        setToggleSvgSearch(prevState => !prevState)
    }

    const handleToggleLibraryClick = () => {
        dispatch(toggleLibraryAction())
    }


    const sideBarClass = matchesMobile ? 'side-bar mobile' : toggleLibrary || matchesNarrow ? 'side-bar collapsed' : 'side-bar'

    return (
        <>
            {/* <div className="side-bar"> */}
            <div className={sideBarClass}>
                <div className="actions-btns">
                    <Link className="home-link" to="/">
                        <div className="home-btn-container" onClick={handleHomeButtonClick}>
                            <button className="home-btn btn" >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    style={{ width: "24px", height: "24px" }}
                                >
                                    <path className='fill-home' d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"
                                        fill={isWhiteFill ? "none" : "white"}
                                        stroke="#b3b3b3"
                                        strokeWidth="2"
                                    >
                                    </path>
                                </svg>

                            </button>
                            <span>Home</span>

                        </div>
                    </Link>

                    <Link className="search-link" to="/search">
                        <div className="search-btn-container" onClick={handleSearchButtonClick}>
                            <button className="search-btn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    style={{ width: "24px", height: "24px" }}
                                >
                                    <path
                                        d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"
                                        fill="#b3b3b3"
                                        stroke="#b3b3b3"
                                        strokeWidth="1"
                                    />
                                    {toggleSvgSearch && (
                                        <path
                                            d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"
                                            fill="#FFFFFF"
                                        />
                                    )}
                                </svg>

                            </button>
                            <span className="span-search">Search</span>
                        </div>
                    </Link>

                </div>

                <SideIndex toggleLibrary={toggleLibrary} onToggleLibrary={handleToggleLibraryClick} />
            </div>

        </>
    )
}
