import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Character } from "../Types/types";
import { Button } from "@mui/material";
import Loader from "../components/Loader";

const DetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => setCharacter(data));
  }, [id]);
  const backToList = () => {
    navigate(-1);
  };

  if (!character) return <Loader />;

  const formattedDate = new Date(character.created).toLocaleDateString("en-GB");

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-5">
        <h2 className="text-primary">{character.name}</h2>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={backToList}
        >
          Back to Lising Page
        </Button>
      </div>
      <div className="row">
        <div className="col-md-4 mb-4">
          <img
            src={character.image}
            alt={character.name}
            className="img-fluid rounded border border-dark"
          />
        </div>
        <div className="col-md-8">
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Type:</strong> {character.type || "N/A"}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Origin:</strong> {character.origin?.name}
          </p>
          <p>
            <strong>Last Known Location:</strong> {character.location?.name}
          </p>
          <p>
            <strong>First Seen:</strong> {formattedDate}
          </p>
          <p>
            <strong>Total Episodes:</strong> {character.episode.length}
          </p>
        </div>
      </div>

      <hr className="my-4" />
      <h5 className="text-secondary">More Info</h5>
      <p>
        {character.name} is a {character.species.toLowerCase()} of gender{" "}
        <em>{character.gender.toLowerCase()}</em>
        originally from <strong>{character.origin?.name}</strong>. This
        character appears in
        <strong> {character.episode.length}</strong> episode
        {character.episode.length > 1 ? "s" : ""}.
      </p>
    </div>
  );
};

export default DetailPage;
