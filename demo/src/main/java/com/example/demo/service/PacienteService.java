package com.example.demo.service;

import com.example.demo.model.Paciente;
import com.example.demo.repository.PacienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    // Devuelve todos los pacientes
    public List<Paciente> obtenerPacientes() {
        return pacienteRepository.findAll(); // Spring Data JPA devuelve un List
    }

    // Devuelve un paciente por ID
    public Optional<Paciente> obtenerPacientePorId(Long id) {
        return pacienteRepository.findById(id);
    }

    public Paciente guardarPaciente(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    // Actualizar un paciente
    public Paciente actualizarPaciente(Long id, Paciente pacienteActualizado) {
        return pacienteRepository.findById(id).map(paciente -> {
            paciente.setNombre(pacienteActualizado.getNombre());
            paciente.setApellido(pacienteActualizado.getApellido());
            paciente.setEmail(pacienteActualizado.getEmail());
            paciente.setMedico(pacienteActualizado.getMedico()); // Actualiza la relación con el médico
            return pacienteRepository.save(paciente);
        }).orElseThrow(() -> new RuntimeException("Paciente no encontrado con el ID: " + id));
    }

    public void eliminarPaciente(Long id) {
        pacienteRepository.deleteById(id);
    }
}
