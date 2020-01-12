package app;

import java.util.List;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import com.fasterxml.jackson.core.type.TypeReference;

class Movie {
    private int id;
    private String title = null;
    private String director = null;
    private String releaseDate = null;
    private String type = null;
    private static int count = 0;

    public Movie() {
        this.id = Movie.count++;
    }

    public int getId()              {return this.id;}
    public String getTitle()        {return this.title;}
    public String getDirector()     {return this.director;}
    public String getReleaseDate()  {return this.releaseDate;}
    public String getType()         {return this.type;}

    public void setId(int id)                       {this.id = id;}
    public void setTitle(String title)              {this.title = title;}
    public void setDirector(String director)        {this.director = director;}
    public void setReleaseDate(String releaseDate)  {this.releaseDate = releaseDate;}
    public void setType(String type)                {this.type = type;}
}


public class MovieDatabase {
    private List<Movie> movies;
    private ObjectMapper objectMapper = new ObjectMapper();
    private String jsonFile;
    
    public MovieDatabase(String dataFile) throws IOException {
        this.objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        this.jsonFile = dataFile;
        this.movies = this.objectMapper.readValue(new File(this.jsonFile), new TypeReference<List<Movie>>(){});
        this.objectMapper.writeValue(new FileOutputStream(this.jsonFile), this.movies); // This instantiates the movies' id values which are needed for accurate update/delete actions
    }
    
    public List<Movie> getAll() {
        return this.movies;
    }

    public Movie get(int index) {
        return this.movies.get(index);
    }

    public int create(String title, String director, String releaseDate, String type) throws IOException {
        Movie movie = new Movie();
        int newId = this.getNewId();
        movie.setId(newId);
        movie.setTitle(title);
        movie.setDirector(director);
        movie.setReleaseDate(releaseDate);
        movie.setType(type);
        this.movies.add(movie);
        this.objectMapper.writeValue(new FileOutputStream(this.jsonFile), this.movies);
        return newId;
    }

    public int add(Movie movie) throws IOException  {
        int newId = this.getNewId();
        movie.setId(newId);
        this.movies.add(movie);
        this.objectMapper.writeValue(new FileOutputStream(this.jsonFile), this.movies);
        return newId;
    }

    public void update(int id, Movie updatedMovie) throws IOException {
        Movie currentMovie = this.findById(id);
        currentMovie.setTitle(updatedMovie.getTitle());
        currentMovie.setDirector(updatedMovie.getDirector());
        currentMovie.setReleaseDate(updatedMovie.getReleaseDate());
        currentMovie.setType(updatedMovie.getType());
        this.objectMapper.writeValue(new FileOutputStream(this.jsonFile), this.movies);
    }

    public void delete(int id) throws IOException {
        for (int i = 0; i < this.movies.size(); i++) {
            if (this.movies.get(i).getId() == id) {
                this.movies.remove(i);
                break;
            }
        }
        this.objectMapper.writeValue(new FileOutputStream(this.jsonFile), this.movies);
    }

    private Movie findById(int id) {
        Movie result = null;
        for (int i = 0; i < this.movies.size(); i++) {
            result = this.movies.get(i);
            if (result.getId() == id) {
                break;
            }
        }
        return result;
    }

    private int getNewId() {
        int result = 0;
        Movie current = null;
        for (int i = 0; i < this.movies.size(); i++) {
            current = this.movies.get(i);
            if (current.getId() >= result) {
                result = current.getId() + 1;
            };
        };
        return result;
    }
}