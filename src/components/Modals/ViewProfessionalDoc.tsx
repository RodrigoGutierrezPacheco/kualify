"use client"

import Image from "next/image"
import { X, Download } from "lucide-react"
import { useState } from "react"

export interface ViewProfessionalDocProps {
  selectedDocument: string
  documentName: string | null
  handleCloseModal: () => void
}

export default function ViewProfessionalDoc({
  selectedDocument,
  documentName = "Documento",
  handleCloseModal,
}: ViewProfessionalDocProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (!selectedDocument) return
    
    setIsDownloading(true)
    
    try {
      const response = await fetch(selectedDocument)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = documentName || 'documento'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error al descargar:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl flex flex-col shadow-xl">
        <div className="p-3 flex justify-between items-center bg-[#1e3a8a] text-white rounded-t-lg">
          <h3 className="font-medium text-base flex items-center">
            <span>Vista del documento:</span>
            <span className="ml-2 font-normal text-blue-200">{documentName}</span>
          </h3>
          <button
            onClick={handleCloseModal}
            className="text-white cursor-pointer hover:text-gray-200 w-7 h-7 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-auto flex items-center justify-center bg-gray-100 border-b border-gray-200">
          <div className="relative w-full h-[50vh]">
            <Image
              src={selectedDocument || "/placeholder.svg"}
              alt={documentName || "Documento"}
              fill
              className="object-contain"
              unoptimized={true}
            />
          </div>
        </div>
        <div className="p-3 flex justify-between items-center bg-gray-50 rounded-b-lg">
          <button
            className="px-3 cursor-pointer py-1.5 text-sm border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <span className="inline-block h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <Download size={14} />
                Descargar
              </>
            )}
          </button>
          <button
            onClick={handleCloseModal}
            className="cursor-pointer px-4 py-1.5 text-sm bg-[#1e3a8a] text-white rounded hover:bg-[#2563eb] transition-colors font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}