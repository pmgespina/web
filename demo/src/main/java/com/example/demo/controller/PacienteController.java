package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Paciente;
import com.example.demo.service.PacienteService;

@RestController
@RequestMapping("/api/pacientes") // Base para todos los endpoints de este controlador
public class PacienteController {

    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    // Obtener todos los pacientes
    @GetMapping
    public List<Paciente> listarPacientes() {
        return pacienteService.obtenerPacientes(); // Devuelve todos los pacientes
    }

    // Obtener un paciente por ID
    @GetMapping("/{id}")
    public Optional<Paciente> obtenerPacientePorId(@PathVariable Long id) {
        return pacienteService.obtenerPacientePorId(id); // Devuelve un paciente específico por ID
    }

    @GetMapping("/{id}/condicion")
    public ResponseEntity<Object> obtenerCondicionMedica(@PathVariable Long id) {
        // Obtener el paciente usando el servicio
        Optional<Paciente> pacienteOpt = pacienteService.obtenerPacientePorId(id);
        
        if (pacienteOpt.isPresent()) {
            // Obtener la condición médica del paciente utilizando el método getCondicionMedica()
            String condicionMedica = pacienteOpt.get().getCondicionMedica();
            
            // Verificar si la condición médica no es nula
            if (condicionMedica != null) {
                // Devolver la condición médica como un objeto JSON
                return ResponseEntity.ok("{\"condicionMedica\":\"" + condicionMedica + "\"}");
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Crear un nuevo paciente
    @PostMapping
    public ResponseEntity<?> crearPaciente(@RequestBody Paciente paciente) {
        try {
            Paciente pacienteGuardado = pacienteService.guardarPaciente(paciente);
            return ResponseEntity.status(HttpStatus.CREATED).body(pacienteGuardado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Método para actualizar un paciente por ID
    @PutMapping("/{id}")
    public Paciente actualizarPaciente(@PathVariable Long id, @RequestBody Paciente pacienteActualizado) {
        return pacienteService.actualizarPaciente(id, pacienteActualizado);
    }

    // Eliminar un paciente
    @DeleteMapping("/{id}")
    public void eliminarPaciente(@PathVariable Long id) {
        pacienteService.eliminarPaciente(id);
    }

    @PutMapping("/{id}/actualizarParametros")
    public Paciente actualizarParametros(@PathVariable Long id, @RequestBody Paciente pacienteActualizado) {
        return pacienteService.actualizarParametros(id, pacienteActualizado);
    }
}