"use client"

import type React from "react"

import { Upload, X, FileText } from "lucide-react"

export interface UploadProfessionalDocProps {
  handleCloseModal: () => void
  documentTypes: Record<string, string>
  showUploadModal: string
  selectedFile: File | null
  uploadError: string | null
  isUploading: boolean
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFileDrop: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleSubmitUpload: () => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
}

export default function UploadProfessionalDoc({
  handleCloseModal,
  documentTypes,
  showUploadModal,
  selectedFile,
  uploadError,
  isUploading,
  handleFileChange,
  handleFileDrop,
  handleDragOver,
  handleSubmitUpload,
  fileInputRef,
}: UploadProfessionalDocProps) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full flex flex-col shadow-xl">
        <div className="p-4 border-b flex justify-between items-center bg-[#1e3a8a] text-white rounded-t-lg">
          <h3 className="font-semibold flex items-center">
            <span>Subir documento:</span>
            <span className="ml-2 font-normal text-blue-200">{documentTypes[showUploadModal]}</span>
          </h3>
          <button
            onClick={handleCloseModal}
            className="text-white cursor-pointer hover:text-gray-200 w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            aria-label="Cerrar"
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
            accept=".jpg,.jpeg,.png,.pdf"
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
                    Cambiar archivo
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <Upload size={28} className="text-[#1e3a8a]" />
                </div>
                <p className="text-sm text-gray-600 mb-3">Arrastra y suelta tu archivo aquí o</p>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#1e3a8a] text-white rounded-md hover:bg-[#2563eb] transition-colors text-sm shadow-sm"
                >
                  Seleccionar archivo
                </button>
              </>
            )}
            <p className="text-xs text-gray-400 mt-3">Formatos aceptados: JPG, PNG, PDF (Max. 5MB)</p>
          </div>
          {uploadError && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-3 text-sm mb-4">
              {uploadError}
            </div>
          )}
        </div>
        <div className="p-4 border-t flex justify-end gap-2 bg-gray-50 rounded-b-lg">
          <button
            onClick={handleCloseModal}
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
                Subir documento
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
