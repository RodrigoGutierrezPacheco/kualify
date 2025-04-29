"use client"
import { useState, useRef, ChangeEvent } from "react"
import Image from "next/image"
import { Camera } from "lucide-react"
import { Upload, X, FileText } from "lucide-react"
import { uploadProfessionalDocument } from "@/services/professionals"

export default function Avatar({ documents = [], userInfo, handleGetDocuments, handleGetInfo }: {
  documents?: Array<{
    tipo: string;
    url?: string;
  }>;
  userInfo: {
    id: string;
    profesionalname?: string;
  };
  handleGetInfo: () => void
  handleGetDocuments: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const token = localStorage.getItem('tokenK')

  const getInitials = (name?: string) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const profileImage = Array.isArray(documents) 
  ? documents.find((doc) => doc.tipo === "profile_image" && doc.url)
  : null
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const validTypes = ['image/jpeg', 'image/png']
      if (!validTypes.includes(file.type)) {
        setUploadError('Formato no válido. Solo se aceptan JPG o PNG.')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('La imagen es demasiado grande (máx. 5MB)')
        return
      }
      setSelectedFile(file)
      setUploadError(null)
    }
  }

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
      setUploadError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleSubmitUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadError(null);
    
    try {
        const formData = new FormData();
        formData.append('file', selectedFile); 
        formData.append('tipo', 'profile_image');
        const response = await uploadProfessionalDocument(
            userInfo?.id, 
            formData,
            token ?? ""
        );
        if(response.url && response.url !== ""){
            handleGetInfo()
            handleGetDocuments()
            setIsOpen(false);
        } else {
            setUploadError('Error al subir la imagen. Por favor intenta nuevamente.');
        }
    } catch (error) {
        console.error('Error al subir imagen:', error);
        setUploadError('Error al subir la imagen. Por favor intenta nuevamente.');
    } finally {
        setIsUploading(false);
    }
};

  return (
    <>
      <div 
        className="h-32 w-32 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg overflow-hidden relative group cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {profileImage?.url ? (
          <Image
            src={profileImage.url}
            alt={`Foto de perfil de ${userInfo.profesionalname || "usuario"}`}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-90"
            unoptimized={true}
          />
        ) : (
          <span className="flex items-center justify-center h-full w-full">
            {getInitials(userInfo.profesionalname)}
          </span>
        )}

        <div className="absolute bottom-2 right-2 bg-white/80 p-1.5 rounded-full shadow-md transition-all duration-300 transform group-hover:scale-110">
          <Camera className="h-5 w-5 text-gray-800" />
        </div>
      </div>

      {/* Modal para subir foto de perfil */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full flex flex-col shadow-xl">
            <div className="p-4 border-b flex justify-between items-center bg-[#1e3a8a] text-white rounded-t-lg">
              <h3 className="font-semibold">Subir foto de perfil</h3>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setSelectedFile(null)
                  setUploadError(null)
                }}
                className="text-white cursor-pointer hover:text-gray-200 w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                disabled={isUploading}
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png"
                className="hidden"
              />
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-all ${
                  selectedFile ? "border-[#1e3a8a] bg-blue-50" : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
                } ${isUploading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => !isUploading && fileInputRef.current?.click()}
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
              >
                {selectedFile ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <FileText size={24} className="text-[#1e3a8a]" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 break-all max-w-full">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    {!isUploading && (
                      <button
                        type="button"
                        className="mt-3 cursor-pointer text-xs text-[#1e3a8a] hover:text-[#2563eb] underline"
                        onClick={(e) => {
                          e.stopPropagation()
                          fileInputRef.current?.click()
                        }}
                      >
                        Cambiar imagen
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                      <Upload size={28} className="text-[#1e3a8a]" />
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Arrastra y suelta tu imagen aquí o</p>
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#1e3a8a] text-white rounded-md hover:bg-[#2563eb] transition-colors text-sm shadow-sm"
                    >
                      Seleccionar imagen
                    </button>
                  </>
                )}
                <p className="text-xs text-gray-400 mt-3">Formatos aceptados: JPG, PNG (Max. 5MB)</p>
              </div>
              
              {uploadError && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-3 text-sm mb-4">
                  {uploadError}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t flex justify-end gap-2 bg-gray-50 rounded-b-lg">
              <button
                onClick={() => {
                  setIsOpen(false)
                  setSelectedFile(null)
                  setUploadError(null)
                }}
                className="px-4 cursor-pointer py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                disabled={isUploading}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitUpload}
                className={`px-4 cursor-pointer py-2 bg-[#1e3a8a] text-white rounded-md hover:bg-[#2563eb] transition-colors flex items-center gap-2 font-medium shadow-sm ${
                  !selectedFile || isUploading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={!selectedFile || isUploading}
              >
                {isUploading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Subir foto
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}