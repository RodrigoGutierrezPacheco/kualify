/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { getProfessionalDocuments, uploadProfessionalDocument } from "@/services/professionals"
import { useEffect, useState, useRef, ChangeEvent } from "react"
import { Eye, CheckCircle, XCircle, Upload, FileText, FileEdit, AlertCircle, Info } from "lucide-react"
import ViewProfessionalDoc from "@/components/Modals/ViewProfessionalDoc"
import UploadProfessionalDoc from "@/components/Modals/UploadProfessionalDoc"
import { Document } from "@/utils/interfaces/documentsInterfaces"
import { documentTypes } from "@/utils/types/documentsTypes"
import { DocumentType } from "@/utils/interfaces/documentsInterfaces"

export interface ProfessionalDocumentsViewProps {
    id: string | null
}

export default function ProfessionalDocuments({ id }: ProfessionalDocumentsViewProps) {
    const token = localStorage.getItem('tokenK')
    const [documents, setDocuments] = useState<Document[]>([])
    const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
    const [documentName, setDocumentName] = useState<string | null>(null)
    const [missingDocuments, setMissingDocuments] = useState<DocumentType[]>([])
    const [showUploadModal, setShowUploadModal] = useState<DocumentType | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleGetDocuments = async () => {
        try {
            const response = await getProfessionalDocuments(id!, token ?? "")
            const docs = Array.isArray(response) ? response : []
            setDocuments(docs)

            const existingTypes = docs.map((doc: Document) => doc.tipo)
            const missing = (Object.keys(documentTypes) as DocumentType[]).filter(
                (type) => !existingTypes.includes(type)
            )
            setMissingDocuments(missing)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (id) handleGetDocuments()
    }, [id])

    const handleViewDocument = (url: string, tipo: DocumentType) => {
        setSelectedDocument(url)
        setDocumentName(documentTypes[tipo])
    }

    const handleCloseModal = () => {
        setSelectedDocument(null)
        setShowUploadModal(null)
        setSelectedFile(null)
        setUploadError(null)
    }

    const handleUploadDocument = (tipo: DocumentType) => {
        setShowUploadModal(tipo)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
            if (!validTypes.includes(file.type)) {
                setUploadError('Formato no válido. Solo se aceptan JPG, PNG o PDF.')
                return
            }
            if (file.size > 5 * 1024 * 1024) {
                setUploadError('El archivo es demasiado grande (máx. 5MB)')
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
        if (!selectedFile || !showUploadModal || !id) return

        setIsUploading(true)
        setUploadError(null)

        try {
            const formData = new FormData()
            formData.append('file', selectedFile)
            formData.append('tipo', showUploadModal)

            await uploadProfessionalDocument(id, formData, token ?? "")
            await handleGetDocuments()
            handleCloseModal()
        } catch (error) {
            console.error('Error al subir documento:', error)
            setUploadError('Error al subir el documento. Por favor intenta nuevamente.')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="text-xl font-semibold text-[#1e3a8a] mb-2">Documentos</h3>
            <p className="text-sm text-gray-500 mb-4">Agrega y administra tus documentos</p>
            {documents.length === 0 && missingDocuments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No hay documentos disponibles</div>
            ) : (
                <div className="divide-y rounded-lg">
                    {documents.map((doc: Document) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                            <div className="flex items-center">
                                <div className="bg-[#f1f5f9] p-2 rounded-full mr-3">
                                    <FileText size={20} className="text-[#1e3a8a]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#1e3a8a]">{documentTypes[doc.tipo]}</h4>
                                    <span className="text-xs text-gray-500">
                                        {new Date(doc.fecha_subida).toLocaleDateString("es-MX", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {doc.auditado ? (
                                    // Estado 1: Documento auditado y aprobado (verificado)
                                    <span className="flex items-center text-green-600 text-sm">
                                        <CheckCircle size={16} className="mr-1" />
                                        Verificado
                                    </span>
                                ) : doc.comentario ? (
                                    // Estado 2: Documento no auditado pero tiene comentario (rechazado)
                                    <span className="flex items-center text-red-600 text-sm">
                                        <XCircle size={16} className="mr-1" />
                                        Rechazado
                                    </span>
                                ) : (
                                    // Estado 3: Documento no auditado y sin comentario (pendiente)
                                    <span className="flex items-center text-amber-500 text-sm">
                                        <AlertCircle size={16} className="mr-1" />
                                        Sin Verificar
                                    </span>
                                )}

                                <button
                                    onClick={() => handleViewDocument(doc.url, doc.tipo)}
                                    className="flex cursor-pointer items-center text-sm text-[#1e3a8a] hover:text-[#2563eb] transition-colors p-2 rounded-full hover:bg-[#f1f5f9]"
                                    title="Ver documento"
                                >
                                    <Eye size={18} />
                                </button>
                                <button
                                    onClick={() => handleUploadDocument(doc.tipo)}
                                    className="flex cursor-pointer items-center text-sm text-[#1e3a8a] hover:text-[#2563eb] transition-colors p-2 rounded-full hover:bg-[#f1f5f9]"
                                    title="Reemplazar documento"
                                >
                                    <FileEdit size={18} />
                                </button>
                                {doc.comentario && (
                                    <div
                                        className="flex cursor-pointer items-center text-sm text-[#1e3a8a] hover:text-[#2563eb] transition-colors p-2 rounded-full hover:bg-[#f1f5f9]"
                                        title={doc.comentario}
                                    >
                                        <Info size={18} />
                                    </div>

                                )}
                            </div>
                        </div>
                    ))}

                    {missingDocuments.map((tipo: DocumentType) => (
                        <div key={tipo} className="flex items-center justify-between p-4 hover:bg-gray-50">
                            <div className="flex items-center">
                                <div className="bg-[#f1f5f9] p-2 rounded-full mr-3">
                                    <FileText size={20} className="text-[#1e3a8a]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#1e3a8a]">{documentTypes[tipo]}</h4>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="flex items-center text-red-500 text-sm">
                                    <XCircle size={16} className="mr-1" />
                                    Faltante
                                </span>

                                <button
                                    onClick={() => handleUploadDocument(tipo)}
                                    className="flex cursor-pointer items-center text-sm text-[#1e3a8a] hover:text-[#2563eb] transition-colors p-2 rounded-full hover:bg-[#f1f5f9]"
                                    title="Subir documento"
                                >
                                    <Upload size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedDocument && (
                <ViewProfessionalDoc
                    selectedDocument={selectedDocument}
                    handleCloseModal={handleCloseModal}
                    documentName={documentName}
                />
            )}

            {showUploadModal && (
                <UploadProfessionalDoc
                    handleCloseModal={handleCloseModal}
                    documentTypes={documentTypes}
                    showUploadModal={showUploadModal}
                    selectedFile={selectedFile}
                    uploadError={uploadError}
                    isUploading={isUploading}
                    handleFileChange={handleFileChange}
                    handleFileDrop={handleFileDrop}
                    handleDragOver={handleDragOver}
                    handleSubmitUpload={handleSubmitUpload}
                    fileInputRef={fileInputRef}
                />
            )}
        </div>
    )
}