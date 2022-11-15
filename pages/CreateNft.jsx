import React, { useCallback, useContext, useMemo, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/router'
import Image from 'next/image'
import images from "../assets/upload.png"
import { Input } from "../components/index"
import { NFTContext } from '../context/NFTContext'

const CreateNft = () => {
    const [fileId, setFileId] = useState(null)
    const { uploadFile, createNFT } = useContext(NFTContext);
    const [fileurl, setFileurl] = useState(null);
    const { theme } = useTheme();
    const [fromInput, setFromInput] = useState({ price: '', name: '', description: '' });
    const onDrop = useCallback(async (acceptedFiles) => {
        const url = await uploadFile(acceptedFiles);
        setFileId(url.substring(url.indexOf('/') + 2, url.indexOf('.')));
        setFileurl(url);
        console.log(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxSize: 5000000,
    });
    const fileStyle = useMemo(() => (
        `dark:bg-nft-black-1 bg-white flex flex-col border dark:border-white border-black rounded-sm border-dashed p-5
        ${isDragActive ? 'border-file-active' : ""}
        ${isDragReject ? 'border-file-reject' : ""}
        ${isDragAccept ? 'border-file-accept' : ""}
        `
    ), [isDragActive, isDragAccept, isDragReject])
    return (
        <div className="flex justify-center sm:text-sm mt-16 ml-5 mr-5">
            <div className="w-3/5 md:w-full">
                <p className="font-poppins text-xl dark:text-white sm:text-sm text-nft-black-1">Bring your Art life </p>
                <div className="mt-4">
                    <p className="font-poppins text-xl dark:text-white text-nft-black-1 pb-2 sm:text-sm">Upload your Art</p>
                    <div {...getRootProps()} className={fileStyle}>
                        <input {...getInputProps()} />
                        <div className="flex justify-center items-center flex-col">
                            <p className="font-poppins text-xl sm:text-sm ">
                                Image, Video, Audio, or 3D Model
                            </p>
                            <p className="font-poppins text-center dark:text-white text-nft-dark text-sm font-gray p-2">
                                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
                            </p>
                            <div className="flex justify-center items-center flex-col">
                                <Image
                                    src={images}
                                    width={100}
                                    height={100}
                                    objectFit="contain"
                                    alt="file-upload"
                                    className={theme === 'light' ? 'filter invert' : ''}
                                />
                                <p className="font-poppins font-bold dark:text-white text-nft-black-1 text-md sm:text-sm p-2">
                                    drag and drop your files here
                                </p>
                                <p className="font-poppins dark:text-white text-nft-black-1 font-bold text-sm mt-2">
                                    or Browser media on your device
                                </p>
                            </div>
                        </div>
                        {fileurl && (
                            <aside>
                                <div>
                                    <img
                                        src={fileurl}
                                        alt={fileurl}
                                        width={250}
                                        height={250}
                                        objectFit="contain"
                                    />
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
                <Input
                    inputType="input"
                    title="Name"
                    placeholder="NFT art name"
                    handleChange={(e) => setFromInput({ ...fromInput, name: e.target.value })}
                />
                <Input
                    inputType="textarea"
                    title="Description"
                    placeholder="NFT description"
                    handleChange={(e) => setFromInput({ ...fromInput, description: e.target.value })}
                />
                <Input
                    inputType="number"
                    title="Price"
                    placeholder="NFT Price"
                    handleChange={(e) => setFromInput({ ...fromInput, price: e.target.value })}
                />
                <div className="mt-7 w-full flex justify-end">
                    <button className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-white font-poppins font-bold border outline-none p-4 mb-12 rounded-xl" onClick={async () => {
                        await createNFT(fromInput, fileurl, fileId)
                        console.log(createNFT(fromInput, fileurl, fileId))
                    }}>create NFT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateNft