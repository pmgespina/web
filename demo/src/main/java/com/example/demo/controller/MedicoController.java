package com.example.demo.controller;

import com.example.demo.model.Medico;
import com.example.demo.service.MedicoService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicos")
public class MedicoController {

    private final MedicoService medicoService;

    public MedicoController(MedicoService medicoService) {
        this.medicoService = medicoService;
    }

    // Obtener todos los médicos
    @GetMapping
    public List<Medico> obtenerTodos() {
        return medicoService.obtenerTodos();
    }

    // Obtener un médico por ID
    @GetMapping("/{id}")
    public Optional<Medico> obtenerPorId(@PathVariable Long id) {
        return medicoService.obtenerPorId(id);
    }

    // Guardar o actualizar un médico
    @PostMapping
    public Medico guardar(@RequestBody Medico medico) {
        return medicoService.guardar(medico);
    }

    // Método para actualizar un médico por ID
    @PutMapping("/{id}")
    public ResponseEntity<Medico> actualizarMedico(@PathVariable Long id, @RequestBody Medico medico) {
        Medico medicoActualizado = medicoService.actualizarMedico(id, medico);
        return ResponseEntity.ok(medicoActualizado);
    }    

    // Eliminar un médico por ID
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        medicoService.eliminar(id);
    }
}
