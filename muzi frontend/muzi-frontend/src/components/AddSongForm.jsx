"use client"

import { useState } from "react"
import styled from "styled-components"
import { Plus, Music } from "lucide-react"

const FormContainer = styled.div`
  background: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: 12px;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`

const Form = styled.form`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
`

const Input = styled.input`
  flex: 1;
  padding: ${(props) => props.theme.spacing.md};
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px ${(props) => props.theme.colors.primary};
  }
`

const AddButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  border: none;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${(props) => props.theme.colors.textSecondary};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const XpBonus = styled.div`
  margin-top: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.xp};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  font-size: 0.9rem;
`

function AddSongForm({ onAddSong }) {
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!youtubeUrl) return

    setIsSubmitting(true)
    try {
      await onAddSong(youtubeUrl)
      setYoutubeUrl("")
    } catch (error) {
      console.error("Error adding song:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          disabled={isSubmitting}
        />
        <AddButton type="submit" disabled={isSubmitting || !youtubeUrl}>
          <Plus size={18} />
          {isSubmitting ? "Adding..." : "Add Song"}
        </AddButton>
      </Form>
      <XpBonus>
        <Music size={16} />
        Earn 50 XP for adding a new song!
      </XpBonus>
    </FormContainer>
  )
}

export default AddSongForm

