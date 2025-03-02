export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      education: {
        Row: {
          created_at: string
          degree: string
          details: string | null
          id: string
          institution: string
          year: string
        }
        Insert: {
          created_at?: string
          degree: string
          details?: string | null
          id?: string
          institution: string
          year: string
        }
        Update: {
          created_at?: string
          degree?: string
          details?: string | null
          id?: string
          institution?: string
          year?: string
        }
        Relationships: []
      }
      experience_achievements: {
        Row: {
          created_at: string
          description: string
          experience_id: string | null
          id: string
        }
        Insert: {
          created_at?: string
          description: string
          experience_id?: string | null
          id?: string
        }
        Update: {
          created_at?: string
          description?: string
          experience_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_achievements_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_technologies: {
        Row: {
          created_at: string
          experience_id: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          experience_id?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          experience_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_technologies_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          company: string
          created_at: string
          description: string
          duration: string
          id: string
          position: string
        }
        Insert: {
          company: string
          created_at?: string
          description: string
          duration: string
          id?: string
          position: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string
          duration?: string
          id?: string
          position?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      portfolio_profile: {
        Row: {
          bitbucket: string | null
          bluesky: string | null
          cashapp: string | null
          company: string | null
          created_at: string
          discord: string | null
          email: string
          facebook: string | null
          full_name: string | null
          github: string | null
          gitlab: string | null
          id: string
          linkedin: string | null
          location: string
          loliapp: string | null
          name: string
          patreon: string | null
          paypal: string | null
          phone: string | null
          pinterest: string | null
          reddit: string | null
          summary: string
          threads: string | null
          tiktok: string | null
          title: string
          twitter: string | null
          venmo: string | null
          website: string | null
          youtube: string | null
        }
        Insert: {
          bitbucket?: string | null
          bluesky?: string | null
          cashapp?: string | null
          company?: string | null
          created_at?: string
          discord?: string | null
          email: string
          facebook?: string | null
          full_name?: string | null
          github?: string | null
          gitlab?: string | null
          id?: string
          linkedin?: string | null
          location: string
          loliapp?: string | null
          name: string
          patreon?: string | null
          paypal?: string | null
          phone?: string | null
          pinterest?: string | null
          reddit?: string | null
          summary: string
          threads?: string | null
          tiktok?: string | null
          title: string
          twitter?: string | null
          venmo?: string | null
          website?: string | null
          youtube?: string | null
        }
        Update: {
          bitbucket?: string | null
          bluesky?: string | null
          cashapp?: string | null
          company?: string | null
          created_at?: string
          discord?: string | null
          email?: string
          facebook?: string | null
          full_name?: string | null
          github?: string | null
          gitlab?: string | null
          id?: string
          linkedin?: string | null
          location?: string
          loliapp?: string | null
          name?: string
          patreon?: string | null
          paypal?: string | null
          phone?: string | null
          pinterest?: string | null
          reddit?: string | null
          summary?: string
          threads?: string | null
          tiktok?: string | null
          title?: string
          twitter?: string | null
          venmo?: string | null
          website?: string | null
          youtube?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          image_url: string
          link: string
          search_text: unknown | null
          title: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          image_url?: string
          link: string
          search_text?: unknown | null
          title: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          link?: string
          search_text?: unknown | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      project_highlights: {
        Row: {
          created_at: string
          description: string
          id: string
          project_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          project_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_highlights_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_technologies: {
        Row: {
          created_at: string
          id: string
          name: string
          project_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          project_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_technologies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string
          github: string | null
          id: string
          image: string | null
          link: string | null
          project_key: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          github?: string | null
          id?: string
          image?: string | null
          link?: string | null
          project_key: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          github?: string | null
          id?: string
          image?: string | null
          link?: string | null
          project_key?: string
          title?: string
        }
        Relationships: []
      }
      skill_items: {
        Row: {
          created_at: string
          id: string
          name: string
          skill_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          skill_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_items_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string
          created_at: string
          id: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
