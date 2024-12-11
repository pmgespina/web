package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Medico;
import com.example.demo.model.Paciente;
import com.example.demo.repository.MedicoRepository;
import com.example.demo.repository.PacienteRepository;

@Service
public class MedicoService {

    private final MedicoRepository medicoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    public MedicoService(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    // Obtener todos los médicos
    public List<Medico> obtenerTodos() {
        return medicoRepository.findAll();
    }

    // Obtener un médico por ID
    public Optional<Medico> obtenerPorId(Long id) {
        return medicoRepository.findById(id);
    }

    // Guardar o actualizar un médico
    public Medico guardar(Medico medico) {
        return medicoRepository.save(medico);
    }

    public Medico actualizarMedico(Long id, Medico medico) {
        // Busca el médico existente por su ID
        Medico medicoExistente = medicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Médico no encontrado con ID: " + id));
    
        // Actualizar los atributos básicos del médico
        medicoExistente.setNombre(medico.getNombre());
        medicoExistente.setApellido(medico.getApellido());
        medicoExistente.setEmail(medico.getEmail());
        medicoExistente.setEspecialidad(medico.getEspecialidad());
    
        // Actualizar pacientes: modificar la colección existente
        if (medico.getPacientes() != null) {
            List<Paciente> pacientesActualizados = new ArrayList<>();
            for (Paciente paciente : medico.getPacientes()) {
                Paciente pacientePersistido = pacienteRepository.findById(paciente.getId())
                        .orElseThrow(() -> new RuntimeException("Paciente no encontrado con ID: " + paciente.getId()));
                pacientesActualizados.add(pacientePersistido);
            }
            medicoExistente.getPacientes().clear(); // Limpiar la colección actual
            medicoExistente.getPacientes().addAll(pacientesActualizados); // Añadir los pacientes actualizados
        }
    
        // Guardar cambios
        return medicoRepository.save(medicoExistente);
    }
                

    // Eliminar un médico por ID
    public void eliminar(Long id) {
        medicoRepository.deleteById(id);
    }
}
