export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.5';
  };
  public: {
    Tables: {
      agents: {
        Row: {
          cargo: string | null;
          created_at: string;
          email: string | null;
          foto_url: string | null;
          id: string;
          nombre: string;
          telefono: string | null;
          whatsapp: string | null;
        };
        Insert: {
          cargo?: string | null;
          created_at?: string;
          email?: string | null;
          foto_url?: string | null;
          id?: string;
          nombre: string;
          telefono?: string | null;
          whatsapp?: string | null;
        };
        Update: {
          cargo?: string | null;
          created_at?: string;
          email?: string | null;
          foto_url?: string | null;
          id?: string;
          nombre?: string;
          telefono?: string | null;
          whatsapp?: string | null;
        };
        Relationships: [];
      };
      cities: {
        Row: {
          created_at: string;
          descripcion: string | null;
          id: string;
          imagen_url: string | null;
          nombre: string;
          orden: number;
          slug: string;
        };
        Insert: {
          created_at?: string;
          descripcion?: string | null;
          id?: string;
          imagen_url?: string | null;
          nombre: string;
          orden?: number;
          slug: string;
        };
        Update: {
          created_at?: string;
          descripcion?: string | null;
          id?: string;
          imagen_url?: string | null;
          nombre?: string;
          orden?: number;
          slug?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          mensaje: string | null;
          nombre: string;
          property_id: string | null;
          telefono: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: string;
          mensaje?: string | null;
          nombre: string;
          property_id?: string | null;
          telefono?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          mensaje?: string | null;
          nombre?: string;
          property_id?: string | null;
          telefono?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'leads_property_id_fkey';
            columns: ['property_id'];
            isOneToOne: false;
            referencedRelation: 'properties';
            referencedColumns: ['id'];
          },
        ];
      };
      properties: {
        Row: {
          agent_id: string | null;
          alcobas: number;
          amenidades: string[];
          area_m2: number | null;
          banos: number;
          barrio: string | null;
          ciudad: string | null;
          created_at: string;
          descripcion: string | null;
          destacado: boolean;
          direccion: string | null;
          estado: string;
          id: string;
          lat: number | null;
          lng: number | null;
          moneda: string;
          operacion: string;
          parqueaderos: number;
          precio: number | null;
          publicado: boolean;
          slug: string;
          tipo: string;
          titulo: string;
          updated_at: string;
        };
        Insert: {
          agent_id?: string | null;
          alcobas?: number;
          amenidades?: string[];
          area_m2?: number | null;
          banos?: number;
          barrio?: string | null;
          ciudad?: string | null;
          created_at?: string;
          descripcion?: string | null;
          destacado?: boolean;
          direccion?: string | null;
          estado?: string;
          id?: string;
          lat?: number | null;
          lng?: number | null;
          moneda?: string;
          operacion: string;
          parqueaderos?: number;
          precio?: number | null;
          publicado?: boolean;
          slug: string;
          tipo: string;
          titulo: string;
          updated_at?: string;
        };
        Update: {
          agent_id?: string | null;
          alcobas?: number;
          amenidades?: string[];
          area_m2?: number | null;
          banos?: number;
          barrio?: string | null;
          ciudad?: string | null;
          created_at?: string;
          descripcion?: string | null;
          destacado?: boolean;
          direccion?: string | null;
          estado?: string;
          id?: string;
          lat?: number | null;
          lng?: number | null;
          moneda?: string;
          operacion?: string;
          parqueaderos?: number;
          precio?: number | null;
          publicado?: boolean;
          slug?: string;
          tipo?: string;
          titulo?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'properties_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'agents';
            referencedColumns: ['id'];
          },
        ];
      };
      property_images: {
        Row: {
          alt: string | null;
          created_at: string;
          id: string;
          orden: number;
          property_id: string;
          url: string;
        };
        Insert: {
          alt?: string | null;
          created_at?: string;
          id?: string;
          orden?: number;
          property_id: string;
          url: string;
        };
        Update: {
          alt?: string | null;
          created_at?: string;
          id?: string;
          orden?: number;
          property_id?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'property_images_property_id_fkey';
            columns: ['property_id'];
            isOneToOne: false;
            referencedRelation: 'properties';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

type PublicSchema = Database['public'];

export type Property = PublicSchema['Tables']['properties']['Row'];
export type PropertyInsert = PublicSchema['Tables']['properties']['Insert'];
export type PropertyUpdate = PublicSchema['Tables']['properties']['Update'];
export type PropertyImage = PublicSchema['Tables']['property_images']['Row'];
export type City = PublicSchema['Tables']['cities']['Row'];
export type Agent = PublicSchema['Tables']['agents']['Row'];
export type Lead = PublicSchema['Tables']['leads']['Row'];

export type PropertyWithImages = Property & {
  property_images: PropertyImage[];
  agents: Agent | null;
};
