package app;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/movies")
public class MoviesController {
    private final MovieDatabase movieDatabase;
    
    @Autowired // Nothing's going on here because well, this thing isn't an actual database...
    public MoviesController(MovieDatabase movieDatabase) {
        this.movieDatabase = movieDatabase;
    }

    @RequestMapping(value="", method=RequestMethod.GET)
    List<Movie> getAll(@RequestParam Map<String, String> queryParameters) {
        List<Movie> result = this.movieDatabase.getAll();
        return result;
    }

    @RequestMapping(value="/{index}", method=RequestMethod.GET)
    Movie get(@PathVariable("index") int id) {
        return this.movieDatabase.get(id);
    }

    @RequestMapping(value="/", method=RequestMethod.POST)
    int add(@RequestBody Movie movie) throws IOException {
        // must validate user input
        int newId = this.movieDatabase.add(movie);
        return newId;
    }

    @RequestMapping(value="/{index}", method=RequestMethod.PUT)
    ResponseEntity<?> update(@PathVariable("index") int id, @RequestBody Movie movie) throws IOException {
        // must validate user input
        this.movieDatabase.update(id, movie);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @RequestMapping(value="/{index}", method=RequestMethod.DELETE)
    ResponseEntity<?> delete(@PathVariable("index") int id) throws IOException {
        this.movieDatabase.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}