import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FlashcardQuizApp() {
  const [flashcards, setFlashcards] = useState([
    { id: 1, question: "What is the capital of France?", answer: "Paris" },
    { id: 2, question: "Who wrote '1984'?", answer: "George Orwell" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [isEditing, setIsEditing] = useState(false);

  const currentCard = flashcards[currentIndex];

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setShowAnswer(false);
    setCurrentIndex(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
  };

  const addCard = () => {
    if (newCard.question.trim() && newCard.answer.trim()) {
      setFlashcards([
        ...flashcards,
        { id: Date.now(), question: newCard.question, answer: newCard.answer },
      ]);
      setNewCard({ question: "", answer: "" });
    }
  };

  const deleteCard = (id) => {
    const updated = flashcards.filter((card) => card.id !== id);
    setFlashcards(updated);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const editCard = (id) => {
    const card = flashcards.find((c) => c.id === id);
    if (card) {
      setNewCard({ question: card.question, answer: card.answer });
      setIsEditing(id);
    }
  };

  const saveEdit = () => {
    setFlashcards(
      flashcards.map((card) =>
        card.id === isEditing ? { ...card, ...newCard } : card
      )
    );
    setNewCard({ question: "", answer: "" });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-2xl font-bold">Flashcard Quiz App</h1>

      {flashcards.length > 0 ? (
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-lg mb-4">
              {showAnswer ? currentCard.answer : currentCard.question}
            </p>
            <Button onClick={() => setShowAnswer(!showAnswer)}>
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </Button>
            <div className="flex justify-between mt-4">
              <Button onClick={prevCard}>Previous</Button>
              <Button onClick={nextCard}>Next</Button>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="destructive"
                onClick={() => deleteCard(currentCard.id)}
              >
                Delete
              </Button>
              <Button onClick={() => editCard(currentCard.id)}>Edit</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p>No flashcards available. Add a new one!</p>
      )}

      <div className="w-full max-w-md space-y-4">
        <Input
          placeholder="Question"
          value={newCard.question}
          onChange={(e) =>
            setNewCard({ ...newCard, question: e.target.value })
          }
        />
        <Textarea
          placeholder="Answer"
          value={newCard.answer}
          onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
        />
        {isEditing ? (
          <Button className="w-full" onClick={saveEdit}>
            Save Changes
          </Button>
        ) : (
          <Button className="w-full" onClick={addCard}>
            Add Flashcard
          </Button>
        )}
      </div>
    </div>
  );
}
