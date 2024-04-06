import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useDispatch, useSelector } from "react-redux"

import { stationService } from "../services/station.service.local"
import { getActionCurrSong, togglePlaying } from "../store/actions/player.actions"

export function StationDetails() {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currStation, setCurrStation] = useState(null)
    let isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)

    useEffect(() => {
        const { id } = params
        stationService.getById(id)
            .then(station => {
                if (!station) return navigate('/')
                setCurrStation(station)
            })
            .catch(() => {
                showErrorMsg('Had issues loading station')
            })
    }, [params])

    function calcStationDuration(songs) {
        let totalDurationInSeconds = 0

        songs.forEach(song => {
            const [minutes, seconds] = song.duration.split(':')

            totalDurationInSeconds += parseInt(minutes, 10) * 60 + parseInt(seconds, 10)
        })

        const totalMinutes = Math.floor(totalDurationInSeconds / 60)
        const totalSeconds = totalDurationInSeconds % 60

        return `${totalMinutes} min ${totalSeconds.toString().padStart(2, '0')} sec`
    }

    function handleSongClick(song) {
        dispatch(getActionCurrSong(song))
        togglePlaying(false)
    }

    function formatAddedTime(addedTime) {
        const diff = Date.now() - addedTime;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days === 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            if (hours === 0) {
                const minutes = Math.floor(diff / (1000 * 60));
                return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
            } else {
                return `${hours} hour${hours === 1 ? '' : 's'} ago`
            }
        } else if (days === 1) {
            return 'Yesterday';
        } else {
            return `${days} day${days === 1 ? '' : 's'} ago`
        }
    }

    if (!currStation) return <h4>loading...</h4>
    let StationDuration = calcStationDuration(currStation.songs)

    // const { _id, name, songs, imgUrl } = currStation
    return (
        <div className="station-details flex">
            <div className="station-data-container">
                <div className="info-station flex">
                    <div className="station-img-container">
                        <img className="station-img" src={currStation.imgUrl} alt="" />
                    </div>
                    <div className="text-station">
                        <span className="playlist">Playlist</span>
                        <h1 className="title-station">{currStation.name}</h1>
                        <div className="user-info flex">
                            <img className="user-img" src={currStation.createdBy.imgUrl} alt="" />
                            <div className="created-by">{currStation.createdBy.fullname} • </div>
                            <div className="info-songs">
                                <span> {currStation.songs.length}  Songs, {StationDuration}</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="menu-station">
                    <button className="play-btn btn"><span>
                        <svg width="16" height="16" viewBox="0 0 16 16" >
                            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
                            >
                            </path>
                        </svg>
                    </span></button>
                    <button className="opt-btn btn"><span>...</span></button>
                    <button className="display-station-btn btn"><span>List</span>🍔</button>
                </div>
                <div className="songs-details-container">
                    <div className="heading-station">
                        <div className="hash">#</div>
                        <span className="title">Title</span>
                        <span className="album">Album</span>
                        <span className="date">Date added</span>
                        <span className="duration">
                            <svg data-encore-id="icon" role="img" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" fill='white' strokeWidth='0.3' stroke="white"></path>
                                <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"
                                    stroke="white" strokeWidth='0.3' fill='white'>
                                </path></svg>
                        </span>
                    </div>
                    <ul>
                        {currStation.songs.map((song, idx) => (
                            <>
                                <div className="song-preview-container">
                                    <li className="song-preview clean-list" key={song.id}>
                                        <div className="song-num" onClick={() => handleSongClick(song)}>{idx + 1}</div>
                                        <div className="song-info">
                                            <img className="song-img" src={song.imgUrl} alt="" />
                                            <div className="song-title" title={song.title}> {song.title}</div>
                                            <a className="song-artist" href="#" title={song.artist}>{song.artist}</a>
                                        </div>
                                        <a className="song-album" href="#" title={song.album}> {song.album}</a>
                                        <span className="song-added-time">{formatAddedTime(song.addedAt)}</span>
                                        <div className="song-duration">{song.duration}</div>
                                    </li>
                                </div>
                            </>
                        ))}

                    </ul>
                </div>

            </div>
        </div>
    )
}
