package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.Paciente;
import com.example.demo.model.Usuario;
import com.example.demo.repository.PacienteRepository;
import com.example.demo.repository.UsuarioRepository;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;
    private final UsuarioRepository usuarioRepository;

    public PacienteService(PacienteRepository pacienteRepository, UsuarioRepository usuarioRepository) {
        this.pacienteRepository = pacienteRepository;
        this.usuarioRepository = usuarioRepository;
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
        // Validación según la condición médica
        switch (paciente.getCondicionMedica()) {
            case "Diabetes":
                if (paciente.getNivelGlucosa() == null || paciente.getNivelActividadFisica() == null) {
                    throw new IllegalArgumentException("Para Diabetes, debe especificar los niveles de glucosa y actividad física.");
                }
                break;
            case "EPOC":
                if (paciente.getSaturacionO2() == null || paciente.getFrecuenciaRespiratoria() == null) {
                    throw new IllegalArgumentException("Para EPOC, debe especificar la saturación de O2 y la frecuencia respiratoria.");
                }
                break;
            case "Hipertension":
                if (paciente.getPresionArterial() == null || paciente.getFrecuenciaCardiaca() == null) {
                    throw new IllegalArgumentException("Para Hipertension, debe especificar la presión arterial y la frecuencia cardíaca.");
                }
                break;
            default:
                throw new IllegalArgumentException("Condición médica no válida.");
        }
    
        // Guardar el paciente
        Paciente pacienteGuardado = pacienteRepository.save(paciente);

        // Crear el usuario asociado
        Usuario usuario = new Usuario();
        usuario.setUsername(paciente.getUsername()); // Usa el username del paciente
        usuario.setPassword(paciente.getPassword()); // Usa la contraseña del paciente
        usuario.setRol("Paciente"); // Asigna el rol de Paciente
        usuarioRepository.save(usuario);

        return pacienteGuardado;
    }

    
    // Actualizar un paciente
    public Paciente actualizarPaciente(Long id, Paciente pacienteActualizado) {
        return pacienteRepository.findById(id).map(paciente -> {
            paciente.setNombre(pacienteActualizado.getNombre());
            paciente.setApellido(pacienteActualizado.getApellido());
            paciente.setUsername(pacienteActualizado.getUsername());
            paciente.setMedico(pacienteActualizado.getMedico()); // Actualiza la relación con el médico
            return pacienteRepository.save(paciente);
        }).orElseThrow(() -> new RuntimeException("Paciente no encontrado con el ID: " + id));
    }
    

    public Paciente actualizarParametros(Long id, Paciente pacienteActualizado) {
        return pacienteRepository.findById(id).map(paciente -> {
            // Verificar la condición médica del paciente para actualizar los parámetros médicos
            if ("Diabetes".equals(paciente.getCondicionMedica())) {
                // Solo actualizar los parámetros médicos si han cambiado
                if (pacienteActualizado.getNivelGlucosa() != null && !pacienteActualizado.getNivelGlucosa().equals(paciente.getNivelGlucosa())) {
                    paciente.setNivelGlucosa(pacienteActualizado.getNivelGlucosa());
                }
                if (pacienteActualizado.getNivelActividadFisica() != null && !pacienteActualizado.getNivelActividadFisica().equals(paciente.getNivelActividadFisica())) {
                    paciente.setNivelActividadFisica(pacienteActualizado.getNivelActividadFisica());
                }
            } else if ("EPOC".equals(paciente.getCondicionMedica())) {
                if (pacienteActualizado.getSaturacionO2() != null && !pacienteActualizado.getSaturacionO2().equals(paciente.getSaturacionO2())) {
                    paciente.setSaturacionO2(pacienteActualizado.getSaturacionO2());
                }
                if (pacienteActualizado.getFrecuenciaRespiratoria() != null && !pacienteActualizado.getFrecuenciaRespiratoria().equals(paciente.getFrecuenciaRespiratoria())) {
                    paciente.setFrecuenciaRespiratoria(pacienteActualizado.getFrecuenciaRespiratoria());
                }
            } else if ("Hipertension".equals(paciente.getCondicionMedica())) {
                if (pacienteActualizado.getPresionArterial() != null && !pacienteActualizado.getPresionArterial().equals(paciente.getPresionArterial())) {
                    paciente.setPresionArterial(pacienteActualizado.getPresionArterial());
                }
                if (pacienteActualizado.getFrecuenciaCardiaca() != null && !pacienteActualizado.getFrecuenciaCardiaca().equals(paciente.getFrecuenciaCardiaca())) {
                    paciente.setFrecuenciaCardiaca(pacienteActualizado.getFrecuenciaCardiaca());
                }
            }
    
            // Guardar los cambios en los parámetros médicos
            return pacienteRepository.save(paciente);
        }).orElseThrow(() -> new RuntimeException("Paciente no encontrado con el ID: " + id));
    }

    public void eliminarPaciente(Long id) {
        pacienteRepository.deleteById(id);
    }
}
