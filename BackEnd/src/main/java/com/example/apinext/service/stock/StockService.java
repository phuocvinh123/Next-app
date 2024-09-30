package com.example.apinext.service.stock;

import com.example.apinext.model.Stock;
import com.example.apinext.repository.IStockRepository;
import com.example.apinext.service.IGeneralService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StockService implements IStockService {
    @Autowired
    private IStockRepository stockRepository;
    @Override
    public List<Stock> findAll() {
        return stockRepository.findAll();
    }

    @Override
    public Optional<Stock> findById(Long id) {
        return stockRepository.findById(String.valueOf(id));
    }

    @Override
    public void save(Stock stock) {
    stockRepository.save(stock);
    }

    @Override
    public void deleteById(Long id) {
    stockRepository.deleteById(String.valueOf(id));
    }
}
