package com.example.apinext.service.color;

import com.example.apinext.model.Color;
import com.example.apinext.repository.IColorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ColorService implements IColorService{
    @Autowired
    private IColorRepository colorRepository;
    @Override
    public List<Color> findAll() {
        return colorRepository.findAll();
    }

    @Override
    public Optional<Color> findById(Long id) {
        return colorRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(Color color) {
    colorRepository.save(color);
    }

    @Override
    public void deleteById(Long id) {
    colorRepository.deleteById(String.valueOf(id));
    }
}
