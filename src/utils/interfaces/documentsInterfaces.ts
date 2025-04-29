export interface Document {
    id: string
    tipo: DocumentType
    url: string
    auditado: boolean
    fecha_subida: string | Date
    comentario?: string
}

export type DocumentType = "acta_nacimiento" | "comprobante_domicilio" | "constancia_fiscal" | "ine_pasaporte" | "profile_image"
