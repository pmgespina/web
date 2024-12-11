package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Mensaje;
import com.example.demo.repository.MensajeRepository;

@Service
public class MensajeService {
    @Autowired
    private MensajeRepository mensajeRepository;

    public Mensaje enviarMensaje(Mensaje mensaje) {
        mensaje.setFechaEnvio(LocalDateTime.now());
        return mensajeRepository.save(mensaje);
    }

    public List<Mensaje> obtenerMensajes(Long pacienteId, Long medicoId) {
        return mensajeRepository.findByPacienteIdAndMedicoId(pacienteId, medicoId);
    }
}
